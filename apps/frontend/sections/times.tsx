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

  useEffect(() => {
    // @ts-expect-error - This expression is not callable.
    if (timesStatus === 'idle') dispatch(fetchTimes());
  }, [dispatch, timesStatus]);

  const localizedTimes = times.map(({ name, time }) => ({
    name: dictionary.times[capitalize(name) as keyof typeof dictionary.times], // simplify this
    time: formatTime(time, lang),
  }));

  return (
    <Flex align="center" justify="space-evenly" gap="md">
      {localizedTimes.map(({ name, time }) => (
        <PrayerTimesCard key={name} prayer={{ name, time }} />
      ))}
    </Flex>
  );
};

const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1); // TODO: make util
const formatTime = (time: Date, lang: string) => {
  moment.locale(lang);
  return moment(time).format('h:mm A');
};
