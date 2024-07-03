'use client';

import { Text, Switch, NumberInput } from '@mantine/core';
import '../accordion.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { PrayerTime } from '@islamic-kit/prayer-times';
import { subscribe } from '@enegix/events';

import {
  selectTimePeriod,
  setTimePeriod,
  setHideScreen,
  setCurrentTimePeriod,
  setShowAzanTime,
  setCurrentPrayTimeName,
  selectHideScreen,
  selectAkamaAfter,
  setAkamaAfter,
  setEnableCountDown,
} from '../../../lib/features/settings';
import { useDictionary } from '../../../app/[lang]/dictionary-provider';
import styles from '../../../assets/css/settings.module.css';
import { selectTimes } from '../../../lib/features/times';

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

function HideDisplayScreen({ isArabic }: { isArabic: boolean }) {
  const dispatch = useDispatch();
  const dictionary = useDictionary();
  const value = useSelector(selectHideScreen);
  const times = useSelector(selectTimes);
  const timePeriod = useSelector(selectTimePeriod);
  const akamaAfter = useSelector(selectAkamaAfter);

  const toggleOverlay = () => {
    dispatch(setHideScreen(!value));
  };

  const getPrayerIndex = (name: string): number => {
    switch (name) {
      case 'fajr': {
        return 0;
      }
      case 'dhuhr': {
        return 2;
      }
      case 'asr': {
        return 3;
      }
      case 'maghrib': {
        return 4;
      }
      case 'isha': {
        return 5;
      }
    }
    return -1;
  };

  const startPrayTime = (name: string) => {
    const index = getPrayerIndex(name);
    const prayerTimePeriod = timePeriod[index];

    if (index !== -1) {
      dispatch(setCurrentPrayTimeName(name));
      dispatch(setShowAzanTime(true));

      setTimeout(
        () => {
          dispatch(setShowAzanTime(false));
          dispatch(setEnableCountDown(true));
          dispatch(setCurrentTimePeriod(prayerTimePeriod));
        },
        akamaAfter * 60 * 1000
      ); //  azan time
    }
  };

  subscribe<PrayerTime>('next-prayer', (prayer) => {
    startPrayTime(prayer.name);
  });

  return (
    <div style={{ width: '100%', marginTop: '2rem' }} className={isArabic ? styles.alRight : ''}>
      <Text>{dictionary.settings.displayScreen.hideDisplayScreen}</Text>
      <Switch
        style={{ marginTop: '0.5rem' }}
        defaultChecked={value}
        onClick={toggleOverlay}
        label={dictionary.settings.displayScreen.hideManually}
      />
      <Text style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        {dictionary.settings.displayScreen.prayTimeBanner}
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
      <Text style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        {dictionary.settings.AzanDuration}
      </Text>
      <NumberInput value={akamaAfter} onChange={(e) => dispatch(setAkamaAfter(e))} />
    </div>
  );
}
type BlackScreenInputCard = {
  time: PrayerTime;
  index: number;
  isArabic: boolean;
};

function BlackScreenInputCard({ index, isArabic, time }: BlackScreenInputCard) {
  const dictionary = useDictionary();
  const dispatch = useDispatch();
  const timePeriod = useSelector(selectTimePeriod);

  const getPrayerTimeNames = (name: string) => {
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
    return (dictionary.times as PrayerTimesDictionary)[capitalized];
  };

  const handleChange = (value: number | string) => {
    const updatedTimePeriod = [...timePeriod];
    updatedTimePeriod[index] = typeof value === 'string' ? parseInt(value, 10) : value;
    dispatch(setTimePeriod(updatedTimePeriod));
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
      <NumberInput defaultValue={timePeriod[index]} onChange={handleChange} />
    </div>
  );
}
export default HideDisplayScreen;
