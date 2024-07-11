import React from 'react';
import { Button } from '@mantine/core';
import { publish } from '@enegix/events';
import { PrayerTime } from '@islamic-kit/prayer-times';
import { useSelector } from 'react-redux';
import { selectCurrentPrayTimeName } from '../../lib/features/settings';
import { capitalize } from '../../sections/times';

function Toggle() {
  const name = useSelector(selectCurrentPrayTimeName);
  const getName = (index: number) => {
    switch (index) {
      case 0:
        return 'Fajr';
      case 1:
        return 'Sunrise';
      case 2:
        return 'Dhuhr';
      case 3:
        return 'Asr';
      case 4:
        return 'Maghrib';
      case 5:
        return 'Isha';
      default:
        return '';
    }
  };

  const onChange = () => {
    // const index = typeof value === 'string' ? parseInt(value, 10) : value;
    // if (isNaN(index)) return; // Add this check to handle invalid input
    // const name = getName(index);
    const CName = capitalize(name);
    console.log('toggle name = ', name);
    console.log('getName = ', name);
    const data: PrayerTime = {
      name: CName,
      time: new Date(),
      isNext: false,
      remaining: 0,
    };
    publish('next-prayer', data);
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <Button onClick={onChange} variant="filled">
        test
      </Button>
    </div>
  );
}

export default Toggle;
