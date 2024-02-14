export enum Strategies {
  OFFLINE = 'OFFLINE',
  ONLINE = 'ONLINE',
}

export interface PrayerTimesStrategyInterface {
  getTimings(
    props: unknown
  ): Record<string, string> | Promise<Record<string, string>>;
}
export type OfflinePrayerTimesStrategy = PrayerTimesStrategyInterface;
export type OnlinePrayerTimesStrategy = PrayerTimesStrategyInterface;
