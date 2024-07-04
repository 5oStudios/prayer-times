import { Center, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import localFont from 'next/font/local';
import moment from 'moment/moment';
import { publish, subscribe } from '@enegix/events';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import { PrayerTime } from '@islamic-kit/prayer-times';
import { selectOrientation } from '../lib/features/settings';
import styles from '../assets/css/settings.module.css';
import { countDownFormatter, localTimer } from './times';

export default function NextPrayTime({ lang }: { lang: string }) {
  const [nextPrayTime, setNextPrayTime] = useState<PrayerTime | undefined>();
  useEffect(() => {
    subscribe<PrayerTime>('next-prayer', (prayer) => {
      setNextPrayTime(prayer);
    });
  }, []);
  const orientation = useSelector(selectOrientation);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const isVertical = orientation === '';
  const localizedTime = nextPrayTime ? localTimer(nextPrayTime.time.toISOString(), lang) : '';
  const counter = nextPrayTime ? Date.now() + nextPrayTime.remaining : Date.now();

  return (
    <div
      className={
        isVertical
          ? isTabletOrMobile
            ? styles.circlePhone
            : styles.circle
          : isTabletOrMobile
            ? styles.circlePhoneSide
            : styles.circleSide
      }
    >
      <Center>
        <Text
          style={{
            fontSize: isVertical
              ? isTabletOrMobile
                ? '0.5rem'
                : '1rem'
              : isTabletOrMobile
                ? '0.5rem'
                : '0.7rem',
            fontWeight: 'bold',
          }}
          className={styles.ArStyle}
        >
          متبقي على الإقامة
        </Text>
      </Center>
      <Center>
        <Text
          className={
            isVertical
              ? isTabletOrMobile
                ? styles.timerClockPhone
                : styles.timerClock
              : styles.timerClockSide
          }
        >
          <div className="next-prayer-alert">الصلاة التالية</div>
          <div className="remaining-timer">
            {nextPrayTime && (
              <Countdown
                date={counter}
                daysInHours
                renderer={({ formatted: { hours, minutes, seconds } }) =>
                  countDownFormatter({ formatted: { hours, minutes, seconds }, lang })
                }
                onComplete={() => publish('next-prayer', nextPrayTime)}
              />
            )}
          </div>
        </Text>
      </Center>
    </div>
  );
}
