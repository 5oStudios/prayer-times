import prayerTimesData from './times.json';
import { MonthlyData, Months, TimeEntry } from './type';

// Cast the imported JSON data to the PrayerTimesData type
const db: MonthlyData = prayerTimesData as unknown as MonthlyData;

// Function to get prayer times based on month and day
export function getPrayerTimes(month: Months, day: string): TimeEntry | undefined {
  const monthData = db[month];
  return monthData ? monthData.find((item) => item.date === day) : undefined;
}
