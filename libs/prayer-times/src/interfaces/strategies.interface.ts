import { MomentInput } from 'moment';

export enum Strategies {
  OFFLINE = 'OFFLINE',
  ONLINE = 'ONLINE',
}

export interface PrayerTimesStrategyInterface {
  getTimings(
    props: unknown
  ): Record<string, MomentInput> | Promise<Record<string, MomentInput>>;
}
export type OfflinePrayerTimesStrategy = PrayerTimesStrategyInterface;
export type OnlinePrayerTimesStrategy = PrayerTimesStrategyInterface;
