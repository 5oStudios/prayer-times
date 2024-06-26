import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, Center } from '@mantine/core';
import styles from '../../../assets/css/settings.module.css';
import { selectCurrentTimePeriod, setCurrentTimePeriod } from '../../../lib/features/settings';

const Timer = () => {
  const dispatch = useDispatch();
  const minutes = useSelector(selectCurrentTimePeriod);
  const [timeLeft, setTimeLeft] = useState<number>(minutes * 60);

  dispatch(setCurrentTimePeriod(0));

  useEffect(() => {
    if (timeLeft <= 0) {
      return; // Stop the timer when time is up
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // eslint-disable-next-line consistent-return
    return () => clearInterval(timerId); // Cleanup the interval on component unmount
  }, [timeLeft]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return timeLeft ? (
    <div style={{ position: 'absolute', right: '0', marginRight: '2rem' }}>
      <Text style={{ fontSize: '1rem' }} className={styles.ArStyle}>
        اقامة الصلاه
      </Text>
      <Center>
        <p>{formatTime(timeLeft)}</p>
      </Center>
    </div>
  ) : (
    <div></div>
  );
};

export default Timer;
