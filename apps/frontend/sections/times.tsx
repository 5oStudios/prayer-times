'use client';

import { Flex } from '@mantine/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';
import { fetchTimes, selectTimes, selectTimesStatus } from '../lib/features/times';
import { PrayerTimesCard } from '../components/times/times-card';
import { useDictionary } from '../app/[lang]/dictionary-provider';
import 'moment/locale/ar';
import { SupportedLanguages } from '../app/i18n/dictionaries';

export const PrayerTimesSection = ({ lang }: { lang: SupportedLanguages }) => {
  const dictionary = useDictionary();
  const times = useSelector(selectTimes);
  const timesStatus = useSelector(selectTimesStatus);
  const dispatch = useDispatch();

  console.log('times', times);

  useEffect(() => {
    // @ts-expect-error - This expression is not callable.
    if (timesStatus === 'idle') dispatch(fetchTimes());
  }, [dispatch, timesStatus]);

  const localizedTimes = times.map(({ name, time, remaining, isNext }) => ({
    name: dictionary.times[capitalize(name) as keyof typeof dictionary.times], // simplify this
    time: formatTime(time, lang),
    remaining: formatTime(remaining, lang),
    isNext,
  }));

  return (
    <Flex align="center" justify="center" gap="lg">
      {localizedTimes.map((prayer) => (
        <PrayerTimesCard key={prayer.name} prayer={prayer} />
      ))}
    </Flex>
  );
};

const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1); // TODO: make util
const formatTime = (time: Date, lang: string) => {
  moment.locale(lang);
  return moment(time).format('h:mm A');
};
