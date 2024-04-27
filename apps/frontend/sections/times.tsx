'use client';

import { Flex } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';
import useLocalStorage from 'use-local-storage';
import { useDeepCompareEffect } from 'use-deep-compare';
import { useMemo } from 'react';
import { Coordinates, PrayerTime } from '@islamic-kit/prayer-times';
import { subscribe } from '@enegix/events';
import { fetchTimes, selectTimes, selectTimesStatus } from '../lib/features/times';
import { PrayerTimesCard } from '../components/times/times-card';
import { useDictionary } from '../app/[lang]/dictionary-provider';
import 'moment/locale/ar';
import { SupportedLanguages } from '../app/i18n/dictionaries';

const kuwaitCoordinates = {
  latitude: 29.3759,
  longitude: 47.9774,
};

export const PrayerTimesSection = ({ lang }: { lang: SupportedLanguages }) => {
  const dictionary = useDictionary();
  const times = useSelector(selectTimes);
  const timesStatus = useSelector(selectTimesStatus);
  const dispatch = useDispatch();
  const [coordinates, setCoordinates] = useLocalStorage<Coordinates | null>('cachedPosition', null);

  // @ts-expect-error - fix this
  subscribe('next-prayer', (prayer: PrayerTime) => {
    alert(`It's time for from store ${prayer.name}`);
    // @ts-expect-error - This expression is not callable.
    dispatch(fetchTimes(coordinates));
  });

  useDeepCompareEffect(() => {
    if (timesStatus !== 'idle') return;
    if (coordinates) {
      // @ts-expect-error - This expression is not callable.
      dispatch(fetchTimes(coordinates));
    }
  }, [coordinates, dispatch, timesStatus]);

  useDeepCompareEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newCoordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        localStorage.setItem('cachedPosition', JSON.stringify(newCoordinates));
        setCoordinates(newCoordinates);
      },
      () => setCoordinates(kuwaitCoordinates)
    );
  }, [coordinates]);

  const localizedTimes = useMemo(() => {
    const newTimes = times.map(({ name, time, remaining, isNext }) => ({
      name: dictionary.times[capitalize(name) as keyof typeof dictionary.times], // simplify this
      time: formatTime(time, lang),
      remaining,
      isNext,
    }));
    return lang === 'ar' ? newTimes.reverse() : newTimes;
  }, [times, lang, dictionary]);

  return (
    <Flex align="center" justify="center" gap="sm">
      {localizedTimes.map((prayer) => (
        <PrayerTimesCard key={prayer.name} prayer={prayer} coordinates={coordinates} />
      ))}
    </Flex>
  );
};

const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1); // TODO: make util
const formatTime = (time: Date, lang: string) => {
  moment.locale('en');
  return moment(time).format('hh:mm');
};
