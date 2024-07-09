'use client';

import React, { useEffect, useState } from 'react';
import { publish } from '@enegix/events';
import { useMediaQuery } from 'react-responsive';
import { useDispatch, useSelector } from 'react-redux';
import { Text, Center } from '@mantine/core';
import styles from '../../../assets/css/settings.module.css';
import {
  selectBeforeAzanTimes,
  selectCurrentPrayTimeName,
  selectCurrentTimePeriod,
  selectEnableCountDown,
  selectOrientation,
  setCurrentTimePeriod,
  setEnableCountDown,
  setHideScreen,
  setShowAzKar,
} from '../../../lib/features/settings';
import { getPrayerIndex } from './hideDisplayScreen';

const playAlert = () => {
  const audio = new Audio('/assets/media/alert/blip.mp3'); // Path relative to public folder
  audio.play();
};

const Timer = ({ changeTextColor }: { changeTextColor: boolean }) => {
  const timePeriod = useSelector(selectCurrentTimePeriod);
  const orientation = useSelector(selectOrientation);
  const enableCountDown = useSelector(selectEnableCountDown);
  const name = useSelector(selectCurrentPrayTimeName);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const isVertical = orientation === '';
  const index = getPrayerIndex(name);
  const beforeAzanTimes = useSelector(selectBeforeAzanTimes);

  useEffect(() => {
    if (enableCountDown) {
      setTimeLeft(beforeAzanTimes[index] * 60); // Setting timeLeft to countdown time in seconds
    }
  }, [enableCountDown, timePeriod]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (enableCountDown && timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            dispatch(setEnableCountDown(false));
            dispatch(setHideScreen(true));
            dispatch(setCurrentTimePeriod(-1));
            playAlert();
            setTimeout(
              () => {
                dispatch(setHideScreen(false));
                dispatch(setShowAzKar(true));
                setTimeout(() => {
                  dispatch(setShowAzKar(false));
                  // publish('adState', { state: true });
                }, 60 * 1000); //azar time
              },
              60 * 1000 * timePeriod // hide screen
            );
            clearInterval(timerId);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [enableCountDown, timeLeft, dispatch, timePeriod]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (timeLeft === 0 && !enableCountDown) {
    return null;
  }

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
            color: changeTextColor ? 'white' : 'black',
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
          style={{
            color: changeTextColor ? 'white' : 'black',
          }}
        >
          {formatTime(timeLeft)}
        </Text>
      </Center>
      {/* <Center>
        <Text>{formatTime(timeLeft)}</Text>
      </Center> */}
    </div>
  );
};

export default Timer;
