'use client';

import { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
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

  const [counter, setCounter] = useState(Date.now() + nextRemaining);

  useEffect(() => {
    setCounter(Date.now() + nextRemaining);
  }, [nextRemaining]);

  return (
    <div
      style={{ zIndex: show ? '5' : '-1' }}
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
            <Countdown
              key={counter}
              date={counter}
              renderer={({ formatted: { hours, minutes, seconds } }) =>
                countDownFormatter({ formatted: { hours, minutes, seconds }, lang })
              }
              daysInHours
            />
          </div>
        </Text>
      </Center>
    </div>
  );
}
