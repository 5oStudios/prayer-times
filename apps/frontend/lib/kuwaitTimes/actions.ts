import prayerTimesData from './times.json';
import { MonthlyData, Months, TimeEntry } from './type';

// Cast the imported JSON data to the PrayerTimesData type
const db: MonthlyData = prayerTimesData as unknown as MonthlyData;

// Function to get prayer times based on month and day
export function getPrayerTimes(month: Months, day: string): TimeEntry | undefined {
  const monthData = db[month];
  return monthData ? monthData.find((item) => item.date === day) : undefined;
}
export function getFormattedDate() {
  const today = new Date();

  // Get the month and day from the Date object
  const month = today.getMonth() + 1; // getMonth() returns month index (0-11)
  const day = today.getDate(); // getDate() returns day of the month

  // Format month and day to be always two digits
  const formattedMonth = month.toString().padStart(2, '0');
  const formattedDay = day.toString().padStart(2, '0');

  // Return the formatted date as MM-DD
  return `${formattedMonth}-${formattedDay}`;
}

export function getMonthAbbreviation(): Months {
  const today = new Date();
  // Array of month abbreviations
  const monthAbbreviations: Months[] = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];

  // Get the month index (0-11)
  const monthIndex = today.getMonth();

  // Return the abbreviation for the month
  return monthAbbreviations[monthIndex];
}

export function timeStringToDate(timeString: string) {
  // Get the current date
  const now = new Date();

  // Extract hours and minutes from the time string
  const [hours, minutes] = timeString.split(':').map(Number);

  // Create a new Date object with the current date and the provided time
  const date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

  return date;
}
