export enum MuslimPrayers {
  FAJR = 'fajr',
  SUNRISE = 'sunrise',
  DHUHR = 'dhuhr',
  ASR = 'asr',
  SUNSET = 'sunset',
  MAGHRIB = 'maghrib',
  ISHA = 'isha',
}

export enum MuslimPrayersAr {
  fajr = 'الفجر',
  sunrise = 'الشروق',
  dhuhr = 'الظهر',
  asr = 'العصر',
  maghrib = 'المغرب',
  isha = 'العشاء',
}

export type SupportedPrayerTimes = { [key in MuslimPrayers]: Date };

export type PrayerTime = {
  name: MuslimPrayers | MuslimPrayersAr;
  time: Date;
  isNext: boolean;
  remaining: number;
};
export type Coordinates = {
  latitude: number;
  longitude: number;
};
