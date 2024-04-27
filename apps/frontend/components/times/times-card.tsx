import { Card } from '@mantine/core';
import localFont from 'next/font/local';
import { useEffect, useState } from 'react';
import moment from 'moment/moment';
import { useDispatch } from 'react-redux';
import { Coordinates } from '@islamic-kit/prayer-times';
import { useDeepCompareEffect } from 'use-deep-compare';
import { fetchTimes } from '../../lib/features/times';

const font = localFont({ src: '../../assets/fonts/ReemKufi-Regular.ttf' });

function formatTime(milliseconds: number) {
  return moment(milliseconds).utcOffset(0).format('HH:mm:ss');
}

export const PrayerTimesCard = ({
  prayer,
  coordinates,
}: {
  prayer: {
    name: string;
    time: string;
    remaining: number;
    isNext: boolean;
  };
  coordinates: Coordinates;
}) => {
  const [timeLeft, setTimeLeft] = useState(prayer.remaining);
  const dispatch = useDispatch();

  // Update the component when the prayer prop changes
  useEffect(() => {
    setTimeLeft(prayer.remaining); // Reset the countdown based on the new remaining time
  }, [prayer]);

  useDeepCompareEffect(() => {
    if (timeLeft <= 0) {
      // If the timer reaches zero, you might want to fetch new prayer times or trigger some other action
      // alert('Time for the next prayer!');
      return;
    }
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime: number) => prevTime - 1000);
      if (timeLeft <= 0) {
        // @ts-expect-error - This expression is not callable.
        dispatch(fetchTimes(coordinates));
        clearInterval(intervalId);
      }
    }, 1000);

    // eslint-disable-next-line consistent-return
    return () => clearInterval(intervalId);
  }, [coordinates, dispatch, timeLeft]);

  return (
    <Card className={`prayer-card ${font.className} ${prayer.isNext ? 'active-prayer' : ''} `}>
      {prayer.isNext && (
        <>
          <div className="next-prayer-alert">الصلاة التالية</div>
          <div className="remaining-timer">{formatTime(timeLeft)}</div>
        </>
      )}
      <div className="prayer-name">{prayer.name}</div>
      <div className="prayer-time">{prayer.time}</div>
    </Card>
  );
};
