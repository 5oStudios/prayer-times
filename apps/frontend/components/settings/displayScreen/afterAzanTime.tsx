'use client';

import { Text, NumberInput } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { PrayerTime } from '@islamic-kit/prayer-times';
import styles from '../../../assets/css/settings.module.css';
import { useDictionary } from '../../../app/[lang]/dictionary-provider';
import { selectTimes } from '../../../lib/features/times';
import { selectBeforeAzanTimes, setBeforeAzanTimes } from '../../../lib/features/settings';

export type PrayerTimesDictionary = {
  [key: string]: string;
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Sunrise: string;
  Sunset: string;
  Midnight: string;
};

export default function AfterAzanTime({ isArabic }: { isArabic: boolean }) {
  const dictionary = useDictionary();
  const times = useSelector(selectTimes);

  return (
    <div>
      <Text style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        {dictionary.settings.displayScreen.BeforeAzanTime}
      </Text>
      <div
        className={`${isArabic ? styles.alRight : ''} ${styles.gridContainer}`}
        style={{ width: '100%' }}
      >
        {times.map(
          (time, index) =>
            time.name !== 'sunrise' && (
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
  const dictionary = useDictionary();
  const dispatch = useDispatch();
  const timePeriod = useSelector(selectBeforeAzanTimes);

  const getPrayerTimeNames = (name: string) => {
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
    return (dictionary.times as PrayerTimesDictionary)[capitalized];
  };

  const handleChange = (value: number | string) => {
    const updatedTimePeriod = [...timePeriod];
    updatedTimePeriod[index] = typeof value === 'string' ? parseInt(value, 10) : value;
    dispatch(setBeforeAzanTimes(updatedTimePeriod));
    console.log('updatedTimes = ', updatedTimePeriod);
  };

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
      <Text style={{ marginLeft: '1rem' }}>{getPrayerTimeNames(time.name)}</Text>
      <NumberInput defaultValue={timePeriod[index]} onChange={handleChange} />{' '}
    </div>
  );
}
