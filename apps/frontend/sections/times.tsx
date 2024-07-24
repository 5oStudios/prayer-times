'use client';

import { Flex } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import moment from 'moment/moment';
import useLocalStorage from 'use-local-storage';
import { useDeepCompareEffect } from 'use-deep-compare';
import { useMemo } from 'react';
import { Coordinates, MuslimPrayers, MuslimPrayersAr, PrayerTime } from '@islamic-kit/prayer-times';
import { subscribe } from '@enegix/events';
import { fetchTimes, selectTimes, selectTimesStatus } from '../lib/features/times';
import { PrayerTimesCard } from '../components/times/times-card';
import { useDictionary } from '../app/[lang]/dictionary-provider';
import 'moment/locale/ar';
import { SupportedLanguages } from '../app/i18n/dictionaries';
import {
  selectAdjustPrayTimes,
  selectAutoLocation,
  selectHideSunRise,
  selectTodayPrayerTimes,
  setCurrentPrayTimeName,
} from '../lib/features/settings';

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
  const adjustedPrayerTimes = useSelector(selectAdjustPrayTimes);
  const isArabic = lang === 'ar';
  const autoLocation = useSelector(selectAutoLocation);
  const arIndex = [5, 4, 3, 2, 1, 0];
  const todayTimes = useSelector(selectTodayPrayerTimes);

  subscribe<PrayerTime>('next-prayer', (prayer) => {
    // alert(`It's time for from store ${prayer.name}`);
    dispatch(setCurrentPrayTimeName(prayer.name));
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

  const localizedReversedTimes = useMemo(() => {
    const localizedTimes = times.map(({ name, time, remaining, isNext }) => ({
      name: dictionary.times[capitalize(name) as keyof typeof dictionary.times] as unknown as
        | MuslimPrayersAr
        | MuslimPrayers,
      time: formatTime(time, lang),
      remaining,
      isNext,
    }));

    return reverseTimes(localizedTimes, lang, isPortrait);
  }, [times, lang, isPortrait, dictionary]);

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
      {localizedReversedTimes.map(
        (
          prayer //add here
        ) =>
          (prayer.name === MuslimPrayers.SUNRISE || prayer.name === MuslimPrayersAr.sunrise) &&
          hideSunRise ? (
            <></>
          ) : (
            <PrayerTimesCard
              key={prayer.name}
              prayer={prayer}
              coordinates={coordinates}
              lang={lang}
            />
          )
      )}
    </Flex>
  );
};

export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1); // TODO: make util
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

const reverseTimes = (
  time: {
    name: MuslimPrayers | MuslimPrayersAr;
    time: string;
    remaining: number;
    isNext: boolean;
  }[],
  lang: string,
  isPortrait: boolean
) => (lang === 'ar' ? (isPortrait ? time : time.slice().reverse()) : time);
