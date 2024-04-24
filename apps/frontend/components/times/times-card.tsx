import { Card } from '@mantine/core';
import localFont from 'next/font/local';
import { useState, useEffect } from 'react';

const font = localFont({ src: '../../assets/fonts/ReemKufi-Regular.ttf' });

function formatTime(milliseconds: number) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export const PrayerTimesCard = ({ prayer } : {
  prayer: {
    name: string;
    time: string;
    remaining: number;
    isNext: boolean;
  };

}) => {
  const [timeLeft, setTimeLeft] = useState(prayer.remaining);

  console.log('times__', prayer);

  // Update the component when the prayer prop changes
  useEffect(() => {
    setTimeLeft(prayer.remaining);// Reset the countdown based on the new remaining time
  }, [prayer]);

  useEffect(() => {
    if (timeLeft <= 0) {
      // If the timer reaches zero, you might want to fetch new prayer times or trigger some other action
      // alert('Time for the next prayer!');
      return;
    }
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime: number) => prevTime - 1000);
    }, 1000);

    // eslint-disable-next-line consistent-return
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return (
    <Card
      className={`prayer-card ${font.className} ${prayer.isNext ? 'active-prayer' : ''} `}
    >
      {prayer.isNext && (
        <>
          <div className="next-prayer-alert">
            الصلاة التالية
          </div>
          <div className="remaining-timer">{formatTime(timeLeft)}</div>
        </>
      )}
      <div className="prayer-name">{prayer.name}</div>
      <div className="prayer-time">{prayer.time}</div>
    </Card>
  );
};
