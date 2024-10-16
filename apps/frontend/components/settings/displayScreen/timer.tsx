'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useDispatch, useSelector } from 'react-redux';
import { Center, Text } from '@mantine/core';
import { publish, subscribe } from '@enegix/events';
import styles from '../../../assets/css/settings.module.css';
import {
  selectEnableCountDown,
  selectOrientation,
  setEnableCountDown,
} from '../../../lib/features/settings';

const playAlert = () => {
  const audio = new Audio('/assets/media/alert/blip.mp3'); // Path relative to public folder
  audio.play();
};
const Timer = ({ changeTextColor }: { changeTextColor: boolean }) => {
  const dispatch = useDispatch();
  const orientation = useSelector(selectOrientation);
  const enableCountDown = useSelector(selectEnableCountDown);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const isVertical = orientation === '';
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    subscribe(
      'start-countdown',
      ({ prayer, minutes }: { prayer: { time: number }; minutes: number }) => {
        setTimeLeft(minutes * 60);
        const timer = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev === 0) {
              clearInterval(timer);
              dispatch(setEnableCountDown(false));
              publish('hide-screen', prayer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    );
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    enableCountDown && (
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
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <div>
          <Text
            style={{
              fontSize: isVertical
                ? isTabletOrMobile
                  ? '0.5rem'
                  : '1rem'
                : isTabletOrMobile
                  ? '0.5rem'
                  : '0.7rem',
              color: changeTextColor ? 'white' : 'black',
              fontWeight: 'bold',
            }}
            className={styles.ArStyle}
          >
            متبقي على الإقامة
          </Text>
        </div>
        <div>
          <Text
            className={
              isVertical
                ? isTabletOrMobile
                  ? styles.timerClockPhone
                  : styles.timerClock
                : styles.timerClockSide
            }
            style={{
              color: changeTextColor ? 'white' : 'black',
            }}
          >
            {formatTime(timeLeft)}
          </Text>
        </div>
      </div>
    )
  );
};

export default Timer;
