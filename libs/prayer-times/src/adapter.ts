import { PrayerTime, SupportedPrayerTimes } from './interfaces';

export const prayerTimesAdapter = (
  times: SupportedPrayerTimes,
): PrayerTime[] => {
  const prayers = Object.entries(times).map(([name, time]) => ({
    name,
    time,
    isNext: false,
    remaining: computeRemainingTime(time),
  }));

  const lowestRemainingPrayer = prayers.sort(
    (a, b) => a.remaining - b.remaining,
  )[0];
  lowestRemainingPrayer.isNext = true;

  return prayers;
};

const computeRemainingTime = (time: Date) => {
  const currentTime = new Date().getTime();
  const targetTime = new Date(time).getTime();

  return targetTime - currentTime;
};
