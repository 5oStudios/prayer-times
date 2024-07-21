import { Text } from '@mantine/core';
import { useDictionary } from 'apps/frontend/app/[lang]/dictionary-provider';
import { selectTimes } from 'apps/frontend/lib/features/times';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../../../assets/css/settings.module.css';
import { BlackScreenInputCard } from './hideDisplayScreen';

export default function AdjustTimes({ isArabic }: { isArabic: boolean }) {
  const times = useSelector(selectTimes);
  const dictionary = useDictionary();
  return (
    <div>
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
              <BlackScreenInputCard key={index} index={index} isArabic={isArabic} time={time} />
            )
        )}
      </div>
    </div>
  );
}
