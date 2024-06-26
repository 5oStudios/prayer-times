'use client';

import { NumberInput, Text } from '@mantine/core';
import { PrayerTime } from '@islamic-kit/prayer-times';
import { subscribe } from '@enegix/events';
import { useDispatch, useSelector } from 'react-redux';
import { selectTimes } from '../../../lib/features/times';
import {
  selectTimePeriod,
  setTimePeriod,
  setHideScreen,
  setCurrentTimePeriod,
} from '../../../lib/features/settings';
import { useDictionary } from '../../../app/[lang]/dictionary-provider';
import styles from '../../../assets/css/settings.module.css';

type PrayerTimesDictionary = {
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

function PrayTimesBanner({ isArabic, lang }: { isArabic: boolean; lang: string }) {
  const times = useSelector(selectTimes);
  const timePeriod = useSelector(selectTimePeriod);
  const dictionary = useDictionary();
  const dispatch = useDispatch();
  const getPrayerIndex = (name: string): number => {
    switch (name) {
      case 'fajr': {
        return 0;
      }
      case 'sunrise': {
        return 1;
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
    return 1;
  };

  const startPrayTime = (name: string) => {
    const prayerTimePeriod = timePeriod[getPrayerIndex(name)];
    const delayInMillis = prayerTimePeriod * 60 * 1000;
    dispatch(setCurrentTimePeriod(prayerTimePeriod));
    setTimeout(() => {
      dispatch(setHideScreen(true));
    }, delayInMillis);

    setTimeout(
      () => {
        dispatch(setHideScreen(false));
      },
      2 * 60 * 1000
    );
  };

  subscribe<PrayerTime>('next-prayer', (prayer) => {
    startPrayTime(prayer.name);
  });

  return (
    <div style={{ width: '100%' }}>
      <Text style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        {dictionary.settings.displayScreen.prayTimeBanner}
      </Text>
      <div className={isArabic ? styles.alRight : ''} style={{ width: '100%' }}>
        {times.map((time, index) => (
          <PrayTimesBannerCard
            key={index}
            index={index}
            isArabic={isArabic}
            lang={lang}
            time={time}
          />
        ))}
      </div>
    </div>
  );
}

function PrayTimesBannerCard({
  index,
  isArabic,
  time,
}: {
  time: PrayerTime;
  index: number;
  isArabic: boolean;
  lang: string;
}) {
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
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: '1rem',
      }}
    >
      <NumberInput defaultValue={timePeriod[index]} onChange={handleChange} />
      <Text style={{ width: '20%', marginLeft: '1rem' }}>{getPrayerTimeNames(time.name)}</Text>
    </div>
  );
}

export { PrayTimesBanner, PrayTimesBannerCard };
