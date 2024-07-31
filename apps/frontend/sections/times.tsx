'use client';

import { Flex } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import useLocalStorage from 'use-local-storage';
import { useDeepCompareEffect } from 'use-deep-compare';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Coordinates,
  MuslimPrayers,
  PrayerTime,
  PrayerTimeName,
  Shifting,
} from '@islamic-kit/prayer-times';
import { subscribe } from '@enegix/events';
import { fetchTimes, selectTimes, selectTimesStatus, setNextPrayer } from '../lib/features/times';
import { PrayerTimesCard } from '../components/times/times-card';
import { useDictionary } from '../app/[lang]/dictionary-provider';
import 'moment/locale/ar';
import { SupportedLanguages } from '../app/i18n/dictionaries';
import {
  selectAdjustPrayTimes,
  selectAutoLocation,
  selectHideSunRise,
  selectShiftBy,
  selectTodayPrayerTimes,
  setNextRemaining,
  setPrayerName,
} from '../lib/features/settings';
import { selectAdjustedTimes } from '../lib/features/adjustedTimes';
import { timeStringToDate } from '../lib/kuwaitTimes/actions';
import { initReload, minuetsToMilliseconds, updateTimesTomorrow } from '../utils';

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
  const displayTime = reverseTimes(times, lang, isPortrait);
  const shiftingTimes = useSelector(selectAdjustedTimes);
  const shifting = shiftingTimes.map(({ id, extraMinutes }) => ({ [id]: extraMinutes }));
  const shiftCityBy = useSelector(selectShiftBy);
  const todayPrayerTimes = useSelector(selectTodayPrayerTimes);
  const defaultShifting: Shifting = {
    fajr: 0,
    dhuhr: 0,
    sunrise: 0,
    asr: 0,
    maghrib: 0,
    isha: 0,
  };

  const shiftingObject = shifting.reduce((acc, val) => ({ ...acc, ...val }), defaultShifting);
  console.log('shiftingObject', shiftingObject);

  const adjustedPrayerTimes = useSelector(selectAdjustPrayTimes);
  const isArabic = lang === 'ar';
  const autoLocation = useSelector(selectAutoLocation);
  const arIndex = [5, 4, 3, 2, 1, 0];
  const todayTimes = useSelector(selectTodayPrayerTimes);
  const stopIsNextRef = useRef(false);

  useEffect(() => {
    subscribe<PrayerTime>('next-prayer', (prayer) => {
      if (prayer.id === MuslimPrayers.isha) {
        // setIshaPrevTime(dispatch);
        updateTimesTomorrow(dispatch);
      }
      // alert(`It's time for from store ${prayer.name}`);
      // dispatch(setCurrentPrayTimeName(prayer.name));
      dispatch(
        fetchTimes({
          coordinates,
          shifting: shiftingObject,
        })
      );
    });
    return () => {
      initReload(dispatch);
    };
  }, []);

  useDeepCompareEffect(() => {
    if (timesStatus !== 'idle') return;
    if (coordinates) {
      dispatch(
        fetchTimes({
          coordinates,
          shifting: shiftingObject,
        })
      );
    }
  }, [coordinates, dispatch, timesStatus, shifting]);

  // const localizedReversedTimes = useMemo(() => {
  //   const localizedTimes = times.map(({ name, time, remaining, isNext, id }) => ({
  //     id,
  //     name,
  //     time,
  //     remaining,
  //     isNext,
  //   }));
  //   console.log('localizedTimes', localizedTimes);

  //   const reversedTimes = reverseTimes(localizedTimes, lang, isPortrait);

  //   if (hideSunRise) {
  //     return reversedTimes.filter((prayer) => prayer.id !== MuslimPrayers.sunrise);
  //   }
  //   return reversedTimes;
  // }, [times, hideSunRise, lang, isPortrait]);

  const localizedTimes = useMemo(() => {
    // Calculate remaining times and determine the next prayer
    const timesWithRemaining = times.map((prayer, index) => {
      let date;
      let remaining = 0;

      if (!autoLocation) {
        const hour = todayTimes[index];
        const holder = timeStringToDate(hour);
        const now = new Date();

        remaining =
          holder.getTime() +
          minuetsToMilliseconds(shiftCityBy) +
          minuetsToMilliseconds(adjustedPrayerTimes[index]) -
          now.getTime();

        // If remaining time is negative, add one day to holder
        if (remaining < 0) {
          holder.setDate(holder.getDate() + 1);
          remaining =
            holder.getTime() +
            minuetsToMilliseconds(shiftCityBy) +
            minuetsToMilliseconds(adjustedPrayerTimes[index]) -
            now.getTime();
        }

        date = holder;
        date.setMinutes(date.getMinutes() + shiftCityBy + adjustedPrayerTimes[index]);
      }

      return {
        ...prayer,
        isNext: remaining < 0 ? false : remaining,
        remaining: remaining ?? 0,
        name: prayer.name,
        time: date ?? new Date(prayer.time),
      };
    });

    // Find the prayer with the minimum remaining time
    const minRemainingTime = Math.min(...timesWithRemaining.map((prayer) => prayer.remaining));
    const timesWithNextFlag = timesWithRemaining.map((prayer) => ({
      ...prayer,
      isNext: prayer.remaining === minRemainingTime,
    }));
    dispatch(setNextRemaining(minRemainingTime));

    const nextPrayer = timesWithNextFlag.find((prayer) => prayer.isNext)?.name;

    dispatch(setPrayerName(isArabic ? nextPrayer?.ar : nextPrayer?.en));

    return reverseTimes(timesWithNextFlag, lang, isPortrait);
  }, [
    times,
    autoLocation,
    adjustedPrayerTimes,
    // handleIsNext,
    todayTimes,
    shiftCityBy,
    lang,
    isPortrait,
  ]);

  useEffect(() => {
    stopIsNextRef.current = false;
  }, [localizedTimes]);

  return (
    <Flex
      align="center"
      justify="center"
      // gap={isTabletOrMobile ? 'lg' : 'sm'}
      style={isTabletOrMobile ? { gap: '1rem' } : { gap: '0.5rem' }}
      className="times-section"
    >
      {localizedTimes.map((prayer) => (
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
// function formatTime(arg0: Date, lang: SupportedLanguages): any {
//   throw new Error('Function not implemented.');
// }
function capitalize(
  name: PrayerTimeName
): 'Fajr' | 'Isha' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Sunrise' | 'Sunset' | 'Midnight' {
  throw new Error('Function not implemented.');
}
