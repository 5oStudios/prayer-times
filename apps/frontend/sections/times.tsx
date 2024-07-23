'use client';

import { Flex } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import moment from 'moment/moment';
import useLocalStorage from 'use-local-storage';
import { useDeepCompareEffect } from 'use-deep-compare';
import { useEffect, useMemo, useState } from 'react';
import { Coordinates, PrayerTime } from '@islamic-kit/prayer-times';
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
  setRemainingTime,
} from '../lib/features/settings';
import { timeStringToDate } from '../lib/kuwaitTimes/actions';

export const PrayerTimesSection = ({ lang }: { lang: SupportedLanguages }) => {
  const dictionary = useDictionary();
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  const times = useSelector(selectTimes);
  const displayTime = reverseTimes(times, lang, isPortrait);
  const timesStatus = useSelector(selectTimesStatus);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const dispatch = useDispatch();
  const [coordinates, setCoordinates] = useLocalStorage<Coordinates | null>('cachedPosition', null);
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

  const localizedTimes = useMemo(() => {
    return displayTime.map((prayer, index) => {
      console.log('time here = ', todayTimes);
      let date;
      if (!autoLocation) {
        const hour = todayTimes[isArabic && !isPortrait ? arIndex[index] : index];
        console.log(' This time ', hour);
        const prayTime = timeStringToDate(hour);
        date = prayTime;
      }
      const adjustedTime = new Date(prayer.time);
      adjustedTime.setMinutes(
        adjustedTime.getMinutes() +
          adjustedPrayerTimes[isArabic && !isPortrait ? arIndex[index] : index]
      );
      console.log('prayer ', prayer.name, ' remainingTime ', prayer.remaining);
      return {
        ...prayer,
        remaining:
          prayer.remaining +
          adjustedPrayerTimes[isArabic && !isPortrait ? arIndex[index] : index] * 60000,
        name: dictionary.times[capitalize(prayer.name) as keyof typeof dictionary.times],
        time: formatTime(date ?? adjustedTime, lang),
      };
    });
  }, [displayTime, dictionary, adjustedPrayerTimes, lang]);

  useEffect(() => {
    const prayerIndex = times.findIndex((e) => e.isNext);
    if (prayerIndex === -1) return;
    const prayer = times[prayerIndex];
    dispatch(setRemainingTime(prayer.remaining + adjustedPrayerTimes[prayerIndex] * 60000));
    dispatch(setCurrentPrayTimeName(prayer.name));

    console.log('Next prayer:', prayer.name);
    console.log('Time remaining:', prayer.remaining);
    console.log('Prayer index:', prayerIndex);
  }, [dispatch, times, adjustedPrayerTimes]);

  return (
    <Flex
      align="center"
      justify="center"
      // gap={isTabletOrMobile ? 'lg' : 'sm'}
      style={isTabletOrMobile ? { gap: '1rem' } : { gap: '0.5rem' }}
      className="times-section"
    >
      {localizedTimes.map(
        (
          prayer //add here
        ) =>
          (prayer.name === 'Sunrise' || prayer.name === 'الشروق') && hideSunRise ? (
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

const reverseTimes = (time: PrayerTime[], lang: string, isPortrait: boolean) =>
  lang === 'ar' ? (isPortrait ? time : time.slice().reverse()) : time;
