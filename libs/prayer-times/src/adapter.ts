import {
  MuslimPrayers,
  MuslimPrayersAr,
  PrayerTime,
  SupportedPrayerTimes,
} from './interfaces';

export const prayerTimesAdapter = (
  times: SupportedPrayerTimes,
): PrayerTime[] => {
  const currentTime = new Date().getTime();
  const prayers: PrayerTime[] = Object.entries(times).map(([rawName, time]) => {
    const remaining = computeRemainingTime(currentTime, time.getTime());
    return {
      id: rawName,
      name: {
        ar: MuslimPrayersAr[rawName],
        en: MuslimPrayers[rawName],
      },
      time,
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
