import React from 'react';
import { NumberInput } from '@mantine/core';
import { publish } from '@enegix/events';
import { PrayerTime } from '@islamic-kit/prayer-times';

function Toggle() {
  const getName = (index: number) => {
    switch (index) {
      case 0:
        return 'fajr';
      case 1:
        return 'sunrise';
      case 2:
        return 'dhuhr';
      case 3:
        return 'asr';
      case 4:
        return 'maghrib';
      case 5:
        return 'isha';
      default:
        return '';
    }
  };

  const onChange = (value: number | string) => {
    const index = typeof value === 'string' ? parseInt(value, 10) : value;
    // if (isNaN(index)) return; // Add this check to handle invalid input
    const name = getName(index);
    console.log('getName = ', name);
    const data: PrayerTime = {
      name,
      time: new Date(),
      isNext: false,
      remaining: 0,
    };
    publish('next-prayer', data);
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <NumberInput
        onChange={onChange}
        label="Input label"
        description="Input description"
        placeholder="Input placeholder"
      />
    </div>
  );
}

export default Toggle;
