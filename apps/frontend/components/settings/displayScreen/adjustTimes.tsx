'use Client';

import { NumberInput, Text } from '@mantine/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MuslimPrayers, PrayerTime } from '@islamic-kit/prayer-times';
import { useDictionary } from '../../../app/[lang]/dictionary-provider';
import { selectTimes } from '../../../lib/features/times';
import styles from '../../../assets/css/settings.module.css';
import { adjustTime, selectAdjustedTimes } from '../../../lib/features/adjustedTimes';

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
            time.id !== MuslimPrayers.sunrise && (
              <AdjustPrayTimesInputCard key={index} index={index} isArabic={isArabic} time={time} />
            )
        )}
      </div>
    </div>
  );
}

type AdjustPrayTimesInputCardProps = {
  time: PrayerTime;
  index: number;
  isArabic: boolean;
};

function AdjustPrayTimesInputCard({ index, isArabic, time }: AdjustPrayTimesInputCardProps) {
  const dispatch = useDispatch();
  const adjustTimes = useSelector(selectAdjustedTimes);

  const handleChange = (value: number | string) => {
    // TODO: find a better way
    if (value === null || value === undefined || value === '' || value === '-' || value === '+') {
      return;
    }

    console.log('value', value);

    dispatch(adjustTime({ id: time.id, extraMinutes: Number(value) }));
  };

  const name = isArabic ? time.name.ar : time.name.en;

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
      <Text style={{ marginLeft: '1rem' }}>{name}</Text>
      <NumberInput
        onChange={handleChange}
        defaultValue={adjustTimes.find((t) => t.id === time.id)?.extraMinutes || 0}
        styles={{
          input: { paddingLeft: isArabic ? '2rem' : '' },
        }}
      />
    </div>
  );
}
