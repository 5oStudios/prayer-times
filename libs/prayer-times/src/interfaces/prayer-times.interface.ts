export enum MuslimPrayers {
  fajr = 'fajr',
  sunrise = 'sunrise',
  dhuhr = 'dhuhr',
  asr = 'asr',
  maghrib = 'maghrib',
  isha = 'isha',
}

export enum MuslimPrayersAr {
  fajr = 'الفجر',
  sunrise = 'الشروق',
  dhuhr = 'الظهر',
  asr = 'العصر',
  maghrib = 'المغرب',
  isha = 'العشاء',
}

export type PrayerTimeName = {
  ar: MuslimPrayersAr;
  en: MuslimPrayers;
};

export type SupportedPrayerTimes = { [key in MuslimPrayers]: Date };

export type PrayerTime = {
  id: string;
  name: PrayerTimeName;
  time: Date;
  isNext: boolean;
  remaining: number;
};
export type Coordinates = {
  latitude: number;
  longitude: number;
};
