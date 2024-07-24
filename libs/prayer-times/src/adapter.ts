import {
  MuslimPrayers,
  MuslimPrayersAr,
  PrayerTime,
  SupportedPrayerTimes,
} from './interfaces';
import { Shifting } from './lib/prayer-times-client';

export const prayerTimesAdapter = (
  times: SupportedPrayerTimes,
  shifting: Shifting = {
    fajr: 0,
    dhuhr: 0,
    sunrise: 0,
    asr: 0,
    maghrib: 0,
    isha: 0,
  },
): PrayerTime[] => {
  const currentTime = new Date();
  const prayers: PrayerTime[] = Object.entries(times).map(([rawName, time]) => {
    const shiftMinutes = shifting[rawName as keyof Shifting];

    console.log('shiftMinutes', shifting);
    const finalTime = new Date(time);
    finalTime.setMinutes(finalTime.getMinutes() + shiftMinutes);

    const remaining = computeRemainingTime(
      currentTime.getTime(),
      finalTime.getTime(),
    );
    return {
      id: rawName,
      name: {
        ar: MuslimPrayersAr[rawName],
        en: MuslimPrayers[rawName],
      },
      time: finalTime,
      isNext: false,
      remaining,
    };
  });

  const lowestRemainingPrayer = prayers.reduce((prev, curr) =>
    prev.remaining < curr.remaining ? prev : curr,
  );
  lowestRemainingPrayer.isNext = true;

  return prayers;
};

export const computeRemainingTime = (
  currentTime: number,
  targetTime: number,
): number => {
  let remainingTime = targetTime - currentTime;
  // If the target time has already passed, calculate the remaining time for the next day
  if (remainingTime < 0) {
    remainingTime += 24 * 60 * 60 * 1000; // Add 24 hours in milliseconds
  }
  return remainingTime;
};

export const getNextPrayer = (prayers: PrayerTime[]): PrayerTime => {
  return prayers.find((prayer) => prayer.isNext) as PrayerTime;
};
