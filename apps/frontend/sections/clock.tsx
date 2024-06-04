'use client';

import { Flex } from '@mantine/core';
import { useEffect, useState } from 'react';
import localFont from 'next/font/local';
import { SupportedLanguages } from '../app/i18n/dictionaries';

export const ClockSection = ({ lang }: { lang: SupportedLanguages }) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    // Function to update the current time
    const tick = (): void => {
      setCurrentTime(new Date());
    };

    // Set up a timer to update the current time every second
    const timerID = setInterval(tick, 1000);

    // Clean up the interval on component unmount
    return (): void => {
      clearInterval(timerID);
    };
  }, []);
  // Function to format the time as a string
  const formatTime = (time: Date): string =>
    time.toLocaleTimeString([lang], { hour: '2-digit', minute: '2-digit' });

  return <div className="clock-section">{formatTime(currentTime)}</div>;
};
