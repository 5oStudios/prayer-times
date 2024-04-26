'use client';

import { Flex } from '@mantine/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';
import useLocalStorage from 'use-local-storage';
import { Coordinates, fetchTimes, selectTimes, selectTimesStatus } from '../lib/features/times';
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

  useEffect(() => {
    if (timesStatus !== 'idle') return;

    if (coordinates) {
      // @ts-expect-error - This expression is not callable.
      dispatch(fetchTimes(coordinates));
    }
  }, [coordinates, dispatch, timesStatus]);

  useEffect(() => {
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
  }, [coordinates, setCoordinates]);

  const localizedTimes = times.map(({ name, time, remaining, isNext }) => ({
    name: dictionary.times[capitalize(name) as keyof typeof dictionary.times], // simplify this
    time: formatTime(time, lang),
    remaining,
    isNext,
  }));
  if (lang === 'ar') {
    localizedTimes.reverse();
  }

  return (
    <Flex align="center" justify="center" gap="sm">
      {localizedTimes.map((prayer) => (
        <PrayerTimesCard key={prayer.name} prayer={prayer} />
      ))}
    </Flex>
  );
};

const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1); // TODO: make util
const formatTime = (time: Date, lang: string) => {
  moment.locale('en');
  return moment(time).format('hh:mm');
};
