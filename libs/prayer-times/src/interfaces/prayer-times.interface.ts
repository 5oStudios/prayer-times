export interface PrayerTimesInterface {
  getTimings(
    props: unknown
  ): Record<MuslimPrayers, string> | Promise<Record<MuslimPrayers, string>>;
}

export interface OnlinePrayerTimesInterface {
  getTimings(props: unknown): Promise<Record<MuslimPrayers, string>>;
}

export interface OfflinePrayerTimesInterface {
  getTimings(props: unknown): Record<MuslimPrayers, string>;
}

export enum MuslimPrayers {
  FAJR = 'fajr',
  SUNRISE = 'sunrise',
  DHUHR = 'dhuhr',
  ASR = 'asr',
  SUNSET = 'sunset',
  MAGHRIB = 'maghrib',
  ISHA = 'isha',
}
