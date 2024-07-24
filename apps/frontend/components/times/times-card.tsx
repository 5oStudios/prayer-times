'use client';

import { Card } from '@mantine/core';
import localFont from 'next/font/local';
import moment from 'moment/moment';
import { computeRemainingTime, Coordinates, PrayerTime } from '@islamic-kit/prayer-times';
import Countdown from 'react-countdown';
import 'moment/locale/ar';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { publish } from '@enegix/events';
import { selectAdjustedTimes } from '../../lib/features/adjustedTimes';

const font = localFont({ src: '../../assets/fonts/ReemKufi-Regular.ttf' });

const formatTime = (time: Date): string => {
  moment.locale('en');
  return moment(time).format('hh:mm');
};

export const PrayerTimesCard = ({
  prayer,
  lang,
}: {
  prayer: PrayerTime;
  coordinates: Coordinates | null;
  lang: string;
}) => {
  const adjustedTimes = useSelector(selectAdjustedTimes);
  const [adjustPrayer, setAdjustPrayer] = useState<PrayerTime>(prayer);
  const localizedTime = localTimer(formatTime(adjustPrayer.time), lang);

  useEffect(() => {
    const adjustedPrayer = adjustedTimes.find((time) => time.id === prayer.id);
    if (adjustedPrayer) {
      const adjustedTime = new Date(prayer.time);
      adjustedTime.setMinutes(adjustedTime.getMinutes() + adjustedPrayer.extraMinutes);
      setAdjustPrayer({
        ...prayer,
        time: adjustedTime,
        remaining: computeRemainingTime(Date.now(), adjustedTime.getTime()),
      });
    } else {
      setAdjustPrayer(prayer);
    }
  }, [adjustedTimes, prayer]);

  const counter = new Date().getTime() + adjustPrayer.remaining;
  return (
    <Card className={`prayer-card ${font.className} ${prayer.isNext ? 'active-prayer' : ''} `}>
      {prayer.isNext && (
        <>
          <div className="next-prayer-alert">الصلاة التالية</div>
          <div className="remaining-timer">
            <Countdown
              date={counter}
              daysInHours
              renderer={({ formatted: { hours, minutes, seconds } }) =>
                countDownFormatter({ formatted: { hours, minutes, seconds }, lang })
              }
              onComplete={() => {
                publish('next-prayer', prayer);
              }}
            />
          </div>
        </>
      )}
      <div className="prayer-name">{lang === 'ar' ? prayer.name.ar : prayer.name.en}</div>

      <div className="remaining-timer vrLayout">
        {prayer.isNext && (
          <Countdown
            date={counter}
            renderer={({ formatted: { hours, minutes, seconds } }) =>
              countDownFormatter({ formatted: { hours, minutes, seconds }, lang })
            }
            daysInHours
            onComplete={() => {
              // publish('next-prayer', prayer);
            }}
          />
        )}
      </div>
      <div className="prayer-time">{localizedTime}</div>
    </Card>
  );
};

export type CountDownFormatterProps = {
  formatted: {
    hours: string;
    minutes: string;
    seconds: string;
  };
  lang: string;
};

export const countDownFormatter = ({
  formatted: { hours, minutes, seconds },
  lang,
}: CountDownFormatterProps) => (
  <div className="timer">
    {localNumber(parseInt(hours, 10), lang).toString().padStart(2, '0')}:
    {localNumber(parseInt(minutes, 10), lang).toString().padStart(2, '0')}:
    {localNumber(parseInt(seconds, 10), lang).toString().padStart(2, '0')}
  </div>
);
export function localTimer(time: string, lang: string) {
  moment.locale('en');
  const [hours, minutes] = time.split(':').map(Number);
  const timeInMilliseconds = (hours * 60 + minutes) * 60 * 1000;
  return moment(timeInMilliseconds).utcOffset(0).format('HH:mm');
}

export function localNumber(number: number, lang: string): string {
  return new Intl.NumberFormat('en').format(number);
}
