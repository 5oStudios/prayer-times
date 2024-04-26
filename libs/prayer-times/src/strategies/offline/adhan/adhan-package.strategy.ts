import { PrayerTimes } from 'adhan';
import { MuslimPrayers, OfflinePrayerTimesStrategy } from '../../../interfaces';

export type OfflineCalculationMethod = NonNullable<
  ConstructorParameters<typeof PrayerTimes>[2]['method']
>;

export class AdhanPackageStrategy implements OfflinePrayerTimesStrategy {
  private readonly adhanService: PrayerTimes | undefined;
  constructor(
    readonly coordinates: Pick<
      ConstructorParameters<typeof PrayerTimes>[0],
      'latitude' | 'longitude'
    >,
    readonly date: ConstructorParameters<typeof PrayerTimes>[1],
    readonly param: ConstructorParameters<typeof PrayerTimes>[2],
  ) {
    this.adhanService = new PrayerTimes(coordinates, date, param);
  }

  getTimings() {
    if (!this.adhanService) {
      throw new Error('Adhan Offline Service is not available');
    }
    return Promise.resolve({
      [MuslimPrayers.FAJR]: this.adhanService.fajr,
      [MuslimPrayers.SUNRISE]: this.adhanService.sunrise,
      [MuslimPrayers.DHUHR]: this.adhanService.dhuhr,
      [MuslimPrayers.ASR]: this.adhanService.asr,
      [MuslimPrayers.MAGHRIB]: this.adhanService.maghrib,
      [MuslimPrayers.ISHA]: this.adhanService.isha,
    });
  }

  // getNextPrayerTime() {
  //   if (!this.adhanService) {
  //     throw new Error('Adhan Offline Service is not available');
  //   }
  //   const now = new Date();
  //   const timings = {
  //     [MuslimPrayers.FAJR]: this.adhanService.fajr,
  //     [MuslimPrayers.SUNRISE]: this.adhanService.sunrise,
  //     [MuslimPrayers.DHUHR]: this.adhanService.dhuhr,
  //     [MuslimPrayers.ASR]: this.adhanService.asr,
  //     [MuslimPrayers.MAGHRIB]: this.adhanService.maghrib,
  //     [MuslimPrayers.ISHA]: this.adhanService.isha,
  //   };
  //   const nextPrayer = Object.entries(timings).find(([, time]) => time > now);
  //   if (!nextPrayer) {
  //     return {
  //       name: MuslimPrayers.FAJR,
  //       time: timings[MuslimPrayers.FAJR],
  //       isNext: true,
  //       remaining: timings[MuslimPrayers.FAJR].getTime() - now.getTime(),
  //     };
  //   }
  //   return {
  //     name: nextPrayer[0] as MuslimPrayers,
  //     time: nextPrayer[1],
  //     isNext: true,
  //     remaining: nextPrayer[1].getTime() - now.getTime(),
  //   };
  // }
}
