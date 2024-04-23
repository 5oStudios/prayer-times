import { SupportedPrayerTimes } from './prayer-times.interface';

export enum Strategies {
  OFFLINE = 'OFFLINE',
  ONLINE = 'ONLINE',
}

export interface PrayerTimesStrategyInterface {
  getTimings(props: unknown): Promise<SupportedPrayerTimes>;
}
export type OfflinePrayerTimesStrategy = PrayerTimesStrategyInterface;
export type OnlinePrayerTimesStrategy = PrayerTimesStrategyInterface;
