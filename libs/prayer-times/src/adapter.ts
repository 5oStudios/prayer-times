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

  return computeIsNext(prayers);
};
const computeIsNext = (prayers: PrayerTime[]): PrayerTime[] => {
  const currentTime = new Date().getTime();

  const nextPrayerIndex = prayers.findIndex((prayer) => {
    const prayerTime = prayer.time.getTime();
    return prayerTime > currentTime;
  });

  if (nextPrayerIndex === -1) {
    return prayers;
  }

  const nextPrayer = prayers[nextPrayerIndex];
  nextPrayer.isNext = true;

  return prayers;
};

const computeRemainingTime = (time: Date): Date => {
  const currentTime = new Date().getTime();
  const targetTime = new Date(time).getTime();

  const remainingTime = targetTime - currentTime;

  return new Date(remainingTime);
};
