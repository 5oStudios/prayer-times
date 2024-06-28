import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useDispatch, useSelector } from 'react-redux';
import { Text, Center } from '@mantine/core';
import styles from '../../../assets/css/settings.module.css';
import {
  selectCurrentTimePeriod,
  selectOrientation,
  setCurrentTimePeriod,
  setHideScreen,
} from '../../../lib/features/settings';

const playAlert = () => {
  const audio = new Audio('/assets/media/alert/blip.mp3'); // Path relative to public folder
  audio.play();
};

const Timer = () => {
  const orientation = useSelector(selectOrientation);
  const minutes = useSelector(selectCurrentTimePeriod);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState<number>(minutes === -1 ? 0 : minutes * 60);
  const isVertical = orientation === '';
  useEffect(() => {
    setTimeLeft(minutes === -1 ? 0 : minutes * 60);
  }, [minutes]);

  useEffect(() => {
    if (minutes === -1) {
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          if (minutes !== -1) {
            dispatch(setHideScreen(true));
            dispatch(setCurrentTimePeriod(-1));
            playAlert();
            setTimeout(() => {
              dispatch(setHideScreen(false));
            }, 60 * 1000);
          }
          clearInterval(timerId);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // eslint-disable-next-line consistent-return
    return () => clearInterval(timerId);
  }, [minutes, dispatch]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (timeLeft === 0 || minutes === -1) {
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
          {formatTime(timeLeft)}
        </Text>
      </Center>
    </div>
  );
};

export default Timer;
