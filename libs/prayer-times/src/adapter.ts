import { SupportedPrayerTimes } from './interfaces';

export const timesAdapter = (times: SupportedPrayerTimes) => {
  return Object.entries(times).map(([name, time]) => ({
    name,
    time,
  }));
};
