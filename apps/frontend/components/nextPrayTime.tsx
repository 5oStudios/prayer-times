/* eslint-disable consistent-return */
'use client';

import Countdown from 'react-countdown';
import { Center, Text } from '@mantine/core';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { selectEnableNextPrayDisplay, selectOrientation } from '../lib/features/settings';
import styles from '../assets/css/settings.module.css';
import { countDownFormatter } from './times';
import { selectNextPrayer } from '../lib/features/times';

export default function NextPrayTime({
  lang,
  changeTextColor,
}: {
  lang: string;
  changeTextColor: boolean;
}) {
  const isArabic = lang === 'ar';
  const orientation = useSelector(selectOrientation);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const isVertical = orientation === '';
  const nextPrayer = useSelector(selectNextPrayer);
  const show = useSelector(selectEnableNextPrayDisplay);
  const [counter, setCounter] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!nextPrayer) return;

    const { remaining } = nextPrayer;
    setCounter(remaining);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCounter((prevState) => prevState - 1000);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [nextPrayer]);

  return (
    <div
      style={{
        zIndex: show ? '5' : '-1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
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
      <div>
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
            color: changeTextColor ? 'white' : 'black',
          }}
          className={styles.ArStyle}
        >
          {isArabic ? nextPrayer.name.ar : nextPrayer.name.en + (isArabic ? ' بعد' : ' after')}
        </Text>
      </div>
      <div>
        <Text
          className={
            isVertical
              ? isTabletOrMobile
                ? styles.timerClockPhoneLeft
                : styles.timerClock
              : styles.timerClockSideLeft
          }
        >
          <div
            className="remaining-timer-nextPray"
            style={{
              color: changeTextColor ? 'white' : 'black',
            }}
          >
            <Countdown
              date={new Date().getTime() + counter}
              renderer={({ formatted: { hours, minutes, seconds } }) =>
                countDownFormatter({ formatted: { hours, minutes, seconds }, lang })
              }
              daysInHours
            />
          </div>
        </Text>
      </div>
    </div>
  );
}
