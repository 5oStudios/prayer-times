export enum MuslimPrayers {
  FAJR = 'fajr',
  SUNRISE = 'sunrise',
  DHUHR = 'dhuhr',
  ASR = 'asr',
  // SUNSET = 'sunset',
  MAGHRIB = 'maghrib',
  ISHA = 'isha',
}

export const supportedPrayers = [
  MuslimPrayers.FAJR,
  MuslimPrayers.SUNRISE,
  MuslimPrayers.DHUHR,
  MuslimPrayers.ASR,
  MuslimPrayers.MAGHRIB,
  MuslimPrayers.ISHA,
];

export type SupportedPrayerTimes = { [key in MuslimPrayers]: Date };

export type PrayerTime = {
  name: string;
  time: Date;
  isNext: boolean;
  remaining: Date;
};
