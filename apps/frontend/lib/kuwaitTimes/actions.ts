import prayerTimesData from './converted_prayer_times.json';
import { Months, PrayerTimes, PrayerTimesData } from './type';

// Cast the imported JSON data to the PrayerTimesData type
const db: PrayerTimesData = prayerTimesData as unknown as PrayerTimesData;

// Function to get prayer times based on month and day
export function getPrayerTimes(month: Months, day: string): PrayerTimes | undefined {
  const monthData = db[month];
  return monthData ? monthData.find((item) => item.date === day) : undefined;
}
