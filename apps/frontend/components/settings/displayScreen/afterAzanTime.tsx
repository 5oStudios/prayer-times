'use client';

import { NumberInput, Text } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { MuslimPrayers, PrayerTime } from '@islamic-kit/prayer-times';
import styles from '../../../assets/css/settings.module.css';
import { useDictionary } from '../../../app/[lang]/dictionary-provider';
import { selectTimes } from '../../../lib/features/times';
import { selectBeforeAzanTimes, setBeforeAzanTimes } from '../../../lib/features/settings';

export default function AfterAzanTime({ isArabic }: { isArabic: boolean }) {
  const dictionary = useDictionary();
  const times = useSelector(selectTimes);

  return (
    <div className={isArabic ? styles.rightAligned : ''}>
      <Text style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        {dictionary.settings.displayScreen.AfterAzanTimer}
      </Text>
      <div
        className={`${isArabic ? styles.alRight : ''} ${styles.gridContainer}`}
        style={{ width: '100%' }}
      >
        {times.map(
          (time, index) =>
            time.id !== MuslimPrayers.sunrise && (
              <BeforeAzanCard key={index} index={index} isArabic={isArabic} time={time} />
            )
        )}
      </div>
    </div>
  );
}

type BeforeAzanCardProp = {
  time: PrayerTime;
  index: number;
  isArabic: boolean;
};
export function BeforeAzanCard({ index, isArabic, time }: BeforeAzanCardProp) {
  const dispatch = useDispatch();
  const timePeriod = useSelector(selectBeforeAzanTimes);

  const handleChange = (value: number | string) => {
    const updatedTimePeriod = [...timePeriod];
    updatedTimePeriod[index] = typeof value === 'string' ? parseInt(value, 10) : value;
    dispatch(setBeforeAzanTimes(updatedTimePeriod));
  };

  const name = isArabic ? time.name.ar : time.name.en;

  return (
    <div
      className={isArabic ? styles.alRight : ''}
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
        defaultValue={timePeriod[index]}
        onChange={handleChange}
        styles={{
          input: { paddingLeft: isArabic ? '2rem' : '' },
        }}
        min={0}
      />
    </div>
  );
}
