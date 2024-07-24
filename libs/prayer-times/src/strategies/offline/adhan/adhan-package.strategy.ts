// eslint-disable-next-line @nx/enforce-module-boundaries
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
      [MuslimPrayers.fajr]: this.adhanService.fajr,
      [MuslimPrayers.sunrise]: this.adhanService.sunrise,
      [MuslimPrayers.dhuhr]: this.adhanService.dhuhr,
      [MuslimPrayers.asr]: this.adhanService.asr,
      [MuslimPrayers.maghrib]: this.adhanService.maghrib,
      [MuslimPrayers.isha]: this.adhanService.isha,
    });
  }
}
