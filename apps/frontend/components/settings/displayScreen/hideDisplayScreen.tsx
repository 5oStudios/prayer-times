'use client';

import { Text, Switch, NumberInput } from '@mantine/core';
import '../accordion.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { playAlert } from '../../../sections/times';
import { PrayerTime } from '@islamic-kit/prayer-times';
import { subscribe, publish } from '@enegix/events';

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
  setEnableAd,
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

export const getPrayerIndex = (name: string): number => {
  switch (name) {
    case 'Fajr':
    case 'الفجر': {
      return 0;
    }
    case 'Dhuhr':
    case 'الظهر': {
      return 2;
    }
    case 'Asr':
    case 'العصر': {
      return 3;
    }
    case 'Maghrib':
    case 'المغرب': {
      return 4;
    }
    case 'Isha':
    case 'العشاء': {
      return 5;
    }
    default: {
      return -1;
    }
  }
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

  subscribe<PrayerTime>('next-prayer', (prayer) => {
    startPrayTime(prayer.name);
    console.log('name here = ', prayer.name);
    console.log('azan time fire data = ', prayer);
  });

  const startPrayTime = (name: string) => {
    console.log('hello');
    const index = getPrayerIndex(name);
    console.log('index', index);
    const prayerTimePeriod = timePeriod[index];
    console.log('prayerTimePeriod', prayerTimePeriod);

    if (index !== -1) {
      // publish('adState', { state: false });
      playAlert();
      dispatch(setEnableAd(false));
      dispatch(setCurrentPrayTimeName(name));
      dispatch(setShowAzanTime(true));
      console.log('hello2');
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

  return (
    <div
      style={{ marginTop: '2rem', width: '100%' }}
      className={isArabic ? styles.rightAligned : ''}
    >
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
      <Text style={{ marginTop: '1rem', marginBottom: '1rem', width: '100%' }}>
        {dictionary.settings.AzanDuration}
      </Text>
      <NumberInput
        value={akamaAfter}
        onChange={(e) => dispatch(setAkamaAfter(e))}
        styles={{
          input: { paddingLeft: isArabic ? '2rem' : '' },
        }}
      />
    </div>
  );
}

type BlackScreenInputCardProps = {
  time: PrayerTime;
  index: number;
  isArabic: boolean;
};

function BlackScreenInputCard({ index, isArabic, time }: BlackScreenInputCardProps) {
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
        defaultValue={timePeriod[index]}
        onChange={handleChange}
        styles={{
          input: { paddingLeft: isArabic ? '2rem' : '' },
        }}
      />
    </div>
  );
}
export default HideDisplayScreen;
