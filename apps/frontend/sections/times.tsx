'use client';

import { Flex } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import useLocalStorage from 'use-local-storage';
import { useDeepCompareEffect } from 'use-deep-compare';
import { useEffect, useMemo } from 'react';
import { Coordinates, MuslimPrayers, PrayerTime } from '@islamic-kit/prayer-times';
import { subscribe } from '@enegix/events';
import { fetchTimes, selectTimes, selectTimesStatus } from '../lib/features/times';
import { PrayerTimesCard } from '../components/times/times-card';
import { useDictionary } from '../app/[lang]/dictionary-provider';
import 'moment/locale/ar';
import { SupportedLanguages } from '../app/i18n/dictionaries';
import { selectHideSunRise } from '../lib/features/settings';

export const PrayerTimesSection = ({ lang }: { lang: SupportedLanguages }) => {
  const dictionary = useDictionary();
  // TODO: make it as useScreen custom hook
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  const times = useSelector(selectTimes);
  const timesStatus = useSelector(selectTimesStatus);
  const dispatch = useDispatch();
  const [coordinates] = useLocalStorage<Coordinates | null>('cachedPosition', null);
  const hideSunRise = useSelector(selectHideSunRise);
  // const adjustedPrayerTimes = useSelector(selectAdjustPrayTimes);
  // const isArabic = lang === 'ar';
  // const autoLocation = useSelector(selectAutoLocation);
  // const arIndex = [5, 4, 3, 2, 1, 0];
  // const todayTimes = useSelector(selectTodayPrayerTimes);
  useEffect(() => {
    subscribe<PrayerTime>('next-prayer', () => {
      // alert(`It's time for from store ${prayer.name}`);
      // dispatch(setCurrentPrayTimeName(prayer.name));
      // @ts-expect-error - This expression is not callable.
      dispatch(fetchTimes(coordinates));
    });
  }, []);

  useDeepCompareEffect(() => {
    if (timesStatus !== 'idle') return;
    if (coordinates) {
      // @ts-expect-error - This expression is not callable.
      dispatch(fetchTimes(coordinates));
    }
  }, [coordinates, dispatch, timesStatus]);

  const localizedReversedTimes = useMemo(() => {
    const localizedTimes = times.map(({ name, time, remaining, isNext, id }) => ({
      id,
      name,
      time,
      remaining,
      isNext,
    }));

    const reversedTimes = reverseTimes(localizedTimes, lang, isPortrait);

    if (hideSunRise) {
      return reversedTimes.filter((prayer) => prayer.id !== MuslimPrayers.sunrise);
    }
    return reversedTimes;
  }, [times, hideSunRise, lang, isPortrait]);

  // const localizedTimes = useMemo(
  //   () =>
  //     displayTime.map((prayer, index) => {
  //       let date;
  //       let remaining;
  //       if (!autoLocation) {
  //         const hour = todayTimes[isArabic && !isPortrait ? arIndex[index] : index];
  //         const holder = timeStringToDate(hour);
  //         const now = new Date();
  //         remaining = holder.getTime() - now.getTime();
  //         date = timeStringToDate(hour);
  //       }
  //       const adjustedTime = new Date(prayer.time);
  //       adjustedTime.setMinutes(
  //         adjustedTime.getMinutes() +
  //           adjustedPrayerTimes[isArabic && !isPortrait ? arIndex[index] : index]
  //       );
  //       return {
  //         ...prayer,
  //         remaining:
  //           remaining ??
  //           prayer.remaining +
  //             adjustedPrayerTimes[isArabic && !isPortrait ? arIndex[index] : index] * 60000,
  //         name: dictionary.times[capitalize(prayer.name) as keyof typeof dictionary.times],
  //         time: formatTime(date ?? adjustedTime, lang),
  //       };
  //     }),
  //   [
  //     displayTime,
  //     autoLocation,
  //     adjustedPrayerTimes,
  //     isArabic,
  //     isPortrait,
  //     arIndex,
  //     dictionary,
  //     lang,
  //     todayTimes,
  //   ]
  // );

  return (
    <Flex
      align="center"
      justify="center"
      // gap={isTabletOrMobile ? 'lg' : 'sm'}
      style={isTabletOrMobile ? { gap: '1rem' } : { gap: '0.5rem' }}
      className="times-section"
    >
      {localizedReversedTimes.map((prayer) => (
        <PrayerTimesCard key={prayer.id} prayer={prayer} coordinates={coordinates} lang={lang} />
      ))}
    </Flex>
  );
};

const playAthan = () => {
  const audio = new Audio(
    'https://download.tvquran.com/download/TvQuran.com__Athan/TvQuran.com__01.athan.mp3'
  );
  audio.play();
};

export type FormatedPrayerTime = Pick<PrayerTime, 'name' | 'id' | 'isNext' | 'remaining'> & {
  time: string;
};

const reverseTimes = (time: PrayerTime[], lang: string, isPortrait: boolean) =>
  lang === 'ar' ? (isPortrait ? time : time.slice().reverse()) : time;
