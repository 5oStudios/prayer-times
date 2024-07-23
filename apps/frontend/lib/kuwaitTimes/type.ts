export type PrayerTimes = {
  date: string;
  fajr: string;
  shurooq: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
};

export type PrayerTimesData = {
  [key in Months]: PrayerTimes[];
};

export type Months =
  | 'january'
  | 'february'
  | 'march'
  | 'april'
  | 'may'
  | 'june'
  | 'july'
  | 'august'
  | 'september'
  | 'october'
  | 'november'
  | 'december';
