'use client';

import { Flex } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import moment from 'moment/moment';
import useLocalStorage from 'use-local-storage';
import { useDeepCompareEffect } from 'use-deep-compare';
import { useMemo } from 'react';
import { Coordinates, PrayerTime } from '@islamic-kit/prayer-times';
import { subscribe } from '@enegix/events';
import { fetchTimes, selectTimes, selectTimesStatus } from '../lib/features/times';
import { PrayerTimesCard } from '../components';
import { useDictionary } from '../app/[lang]/dictionary-provider';
import 'moment/locale/ar';
import { SupportedLanguages } from '../app/i18n/dictionaries';

// const kuwaitCoordinates = {
//   latitude: 29.3759,
//   longitude: 47.9774,
// };

export const PrayerTimesSection = ({ lang }: { lang: SupportedLanguages }) => {
  const dictionary = useDictionary();
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  const times = reverseTimes(useSelector(selectTimes), lang, isPortrait);
  const timesStatus = useSelector(selectTimesStatus);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const dispatch = useDispatch();
  const [coordinates, setCoordinates] = useLocalStorage<Coordinates | null>('cachedPosition', null);

  subscribe<PrayerTime>('next-prayer', (prayer) => {
    // alert(`It's time for from store ${prayer.name}`);
    // @ts-expect-error - This expression is not callable.
    dispatch(fetchTimes(coordinates));
    //todo: add more actions here
  });

  useDeepCompareEffect(() => {
    if (timesStatus !== 'idle') return;
    if (coordinates) {
      // @ts-expect-error - This expression is not callable.
      dispatch(fetchTimes(coordinates));
    }
  }, [coordinates, dispatch, timesStatus]);

  // useDeepCompareEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const newCoordinates = {
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //       };
  //       localStorage.setItem('cachedPosition', JSON.stringify(newCoordinates));
  //       setCoordinates(newCoordinates);
  //     },
  //     () => setCoordinates(kuwaitCoordinates)
  //   );
  // }, []);

  const localizedTimes = useMemo(() => {
    const newTimes = times.map(({ name, time, remaining, isNext }) => ({
      name: dictionary.times[capitalize(name) as keyof typeof dictionary.times], // simplify this
      time: formatTime(time, lang),
      remaining,
      isNext,
    }));
    return newTimes;
  }, [times, lang, dictionary]);

  return (
    <Flex
      align="center"
      justify="center"
      // gap={isTabletOrMobile ? 'lg' : 'sm'}
      style={isTabletOrMobile ? { gap: '1rem' } : { gap: '0.5rem' }}
      className="times-section"
    >
      {localizedTimes.map((prayer) => (
        <PrayerTimesCard key={prayer.name} prayer={prayer} coordinates={coordinates} lang={lang} />
      ))}
    </Flex>
  );
};

const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1); // TODO: make util
const formatTime = (time: Date, lang: string) => {
  moment.locale('en');
  return moment(time).format('hh:mm');
};

const playAthan = () => {
  const audio = new Audio(
    'https://download.tvquran.com/download/TvQuran.com__Athan/TvQuran.com__01.athan.mp3'
  );
  audio.play();
};
const reverseTimes = (time: PrayerTime[], lang: string, isPortrait: boolean) =>
  lang === 'ar' ? (isPortrait ? time : time.slice().reverse()) : time;
