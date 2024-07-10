'use client';

import { CSSProperties, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { SupportedLanguages } from '../app/i18n/dictionaries';
import styles from '../assets/css/settings.module.css';

export const ClockSection = ({
  lang,
  style,
  className,
}: {
  lang: SupportedLanguages;
  style?: CSSProperties;
  className?: string;
}) => {
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

  // Function to format the time as a string
  const formatTime = (time: Date): string => {
    const formattedTime = time.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' });
    return formattedTime;
  };

  return (
    <div
      className={`${className || (isTabletOrMobile ? styles.mobileTextSizeClock : '')}
      ${isTabletOrMobile ? 'clock-section-mobile' : 'clock-section'}
    `}
      style={style}
    >
      {formatTime(currentTime)}
    </div>
  );
};
