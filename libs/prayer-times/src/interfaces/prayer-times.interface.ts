export enum MuslimPrayers {
  FAJR = 'fajr',
  SUNRISE = 'sunrise',
  DHUHR = 'dhuhr',
  ASR = 'asr',
  // SUNSET = 'sunset',
  MAGHRIB = 'maghrib',
  ISHA = 'isha',
}

export type SupportedPrayerTimes = { [key in MuslimPrayers]: Date };

export type PrayerTime = {
  name: string;
  time: Date;
  isNext: boolean;
  remaining: number;
};
export type Coordinates = {
  latitude: number;
  longitude: number;
};
