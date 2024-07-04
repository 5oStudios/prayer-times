'use client';

import { useEffect, useState } from 'react';
import { Center, Text } from '@mantine/core';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import {
  selectEnableNextPrayDisplay,
  selectOrientation,
  selectRemainingTime,
} from '../lib/features/settings';
import styles from '../assets/css/settings.module.css';
import { countDownFormatter } from './times';

export default function NextPrayTime({ lang }: { lang: string }) {
  const nextRemaining = useSelector(selectRemainingTime);
  const orientation = useSelector(selectOrientation);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const isVertical = orientation === '';
  const show = useSelector(selectEnableNextPrayDisplay);

  const [remainingTime, setRemainingTime] = useState<number>(nextRemaining);

  useEffect(() => {
    const targetTime = Date.now() + nextRemaining;

    const interval = setInterval(() => {
      const currentTime = Date.now();
      const timeLeft = targetTime - currentTime;
      setRemainingTime(timeLeft);

      // If timeLeft is less than or equal to 0, clear the interval
      if (timeLeft <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [nextRemaining]);

  if (!show) {
    return <div></div>;
  }

  const formattedTime = countDownFormatter({
    formatted: {
      hours: Math.floor(remainingTime / (1000 * 60 * 60)).toString().padStart(2, '0'),
      minutes: Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0'),
      seconds: Math.floor((remainingTime % (1000 * 60)) / 1000).toString().padStart(2, '0'),
    },
    lang,
  });

  return (
    <div
      className={
        isVertical
          ? isTabletOrMobile
            ? styles.circlePhoneLeft
            : styles.circleLeft
          : isTabletOrMobile
            ? styles.circlePhoneSideLeft
            : styles.circleSideLeft
      }
    >
      <Center>
        <Text
          style={{
            fontSize: isVertical
              ? isTabletOrMobile
                ? '0.6rem'
                : '1.2rem'
              : isTabletOrMobile
                ? '0.7rem'
                : '1rem',
            fontWeight: 'bold',
          }}
          className={styles.ArStyle}
        >
          الصلاة التالية
        </Text>
      </Center>
      <Center>
        <Text
          className={
            isVertical
              ? isTabletOrMobile
                ? styles.timerClockPhoneLeft
                : styles.timerClock
              : styles.timerClockSideLeft
          }
        >
          <div className="remaining-timer-nextPray">
            {formattedTime}
          </div>
        </Text>
      </Center>
    </div>
  );
}
