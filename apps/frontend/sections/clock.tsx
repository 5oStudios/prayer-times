'use client';

import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { SupportedLanguages } from '../app/i18n/dictionaries';
import styles from '../assets/css/settings.module.css';

export const ClockSection = ({ lang }: { lang: SupportedLanguages }) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

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

  // Function to convert numbers to Arabic format
  const toArabicNumber = (number: string) => {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return number.replace(/\d/g, (digit) => arabicDigits[digit]);
  };

  // Function to format the time as a string
  const formatTime = (time: Date): string => {
    const formattedTime = time.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' });
    return formattedTime;
  };

  return (
    <div
      className={`${isTabletOrMobile ? 'clock-section-mobile' : 'clock-section'} ${isTabletOrMobile ? styles.mobileTextSizeClock : ''}`}
    >
      {formatTime(currentTime)}
    </div>
  );
};
