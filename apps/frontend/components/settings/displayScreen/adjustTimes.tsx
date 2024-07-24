'use Client';

import { NumberInput, Text } from '@mantine/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PrayerTime } from '@islamic-kit/prayer-times';
import { useDictionary } from '../../../app/[lang]/dictionary-provider';
import { selectTimes } from '../../../lib/features/times';
import styles from '../../../assets/css/settings.module.css';
import { PrayerTimesDictionary } from './hideDisplayScreen';
import { selectAdjustPrayTimes, setAdjustPrayTimes } from '../../../lib/features/settings';

export default function AdjustTimes({ isArabic }: { isArabic: boolean }) {
  const times = useSelector(selectTimes);
  const dictionary = useDictionary();
  return (
    <div className={isArabic ? styles.rightAligned : ''}>
      <Text style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        {dictionary.settings.displayScreen.adjustTime}
      </Text>
      <div
        className={`${isArabic ? styles.alRight : ''} ${styles.gridContainer}`}
        style={{ width: '100%' }}
      >
        {times.map(
          (time, index) =>
            time.name !== 'sunrise' && (
              <AdjustPrayTimesInputCard key={index} index={index} isArabic={isArabic} time={time} />
            )
        )}
      </div>
      <button
        type="button"
        onClick={() => {
          setTimeout(() => {
            window.location.reload();
          }, 100);
        }}
        style={{
          backgroundColor: 'green',
          paddingRight: '1rem',
          paddingLeft: '1rem',
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
          border: 'none',
          borderRadius: '8px',
          color: 'white',
        }}
      >
        حفظ
      </button>
    </div>
  );
}

type AdjustPrayTimesInputCardProps = {
  time: PrayerTime;
  index: number;
  isArabic: boolean;
};

function AdjustPrayTimesInputCard({ index, isArabic, time }: AdjustPrayTimesInputCardProps) {
  const dictionary = useDictionary();
  const dispatch = useDispatch();
  const timePeriod = useSelector(selectAdjustPrayTimes);

  const getPrayerTimeNames = (name: string) => {
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
    return (dictionary.times as PrayerTimesDictionary)[capitalized];
  };

  const handleChange = (value: number | string) => {
    if (value === null || value === undefined || value === '') {
      return;
    }
    const updatedTimePeriod = [...timePeriod];
    updatedTimePeriod[index] = typeof value === 'string' ? parseInt(value, 10) : value;
    dispatch(setAdjustPrayTimes(updatedTimePeriod));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginBottom: '1rem',
      }}
    >
      <Text style={{ marginLeft: '1rem' }}>{getPrayerTimeNames(time.name)}</Text>
      <NumberInput
        onChange={handleChange}
        defaultValue={timePeriod[index]}
        styles={{
          input: { paddingLeft: isArabic ? '2rem' : '' },
        }}
      />
    </div>
  );
}
