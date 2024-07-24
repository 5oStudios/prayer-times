'use client';

import { NumberInput, Switch, Text } from '@mantine/core';
import '../accordion.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { PrayerTime } from '@islamic-kit/prayer-times';
import {
  selectHideScreen,
  selectShowAzanDuration,
  selectTimePeriod,
  setHideScreen,
  setShowAzanDuration,
  setTimePeriod,
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
  const hadithScreen = useSelector(selectHideScreen);
  const times = useSelector(selectTimes);
  const akamaAfter = useSelector(selectShowAzanDuration);

  const toggleOverlay = () => {
    dispatch(setHideScreen(!hadithScreen));
  };

  return (
    <div style={{ marginTop: '2rem' }} className={isArabic ? styles.rightAligned : ''}>
      <Text>{dictionary.settings.displayScreen.hideDisplayScreen}</Text>
      <Switch
        style={{ marginTop: '0.5rem' }}
        defaultChecked={hadithScreen}
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
        onChange={(value) => {
          dispatch(setShowAzanDuration(value as number));
        }}
        styles={{
          input: { paddingLeft: isArabic ? '2rem' : '' },
        }}
        min={0}
      />
    </div>
  );
}

type BlackScreenInputCardProps = {
  time: PrayerTime;
  index: number;
  isArabic: boolean;
};

export function BlackScreenInputCard({ index, isArabic, time }: BlackScreenInputCardProps) {
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
        min={0}
      />
    </div>
  );
}

export default HideDisplayScreen;
const playAlert = () => {
  const audioAlert = new Audio('https://cdn.pixabay.com/audio/2023/01/01/audio_a178429b06.mp3');
  audioAlert.play();
};

export const getPrayerIndex = (name: string): number => {
  switch (name) {
    case 'Fajr':
    case 'الفجر': {
      return 0;
    }
    case 'Sunrise':
    case 'الشروق': {
      return 1;
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
