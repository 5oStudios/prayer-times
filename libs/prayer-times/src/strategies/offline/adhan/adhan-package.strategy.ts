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
    readonly param: ConstructorParameters<typeof PrayerTimes>[2]
  ) {
    this.adhanService = new PrayerTimes(coordinates, date, param);
  }

  getTimings() {
    if (!this.adhanService) {
      throw new Error('Adhan Offline Service not available');
    }
    return Promise.resolve({
      [MuslimPrayers.FAJR]: this.dateToTime(this.adhanService.fajr),
      [MuslimPrayers.SUNRISE]: this.dateToTime(this.adhanService.sunrise),
      [MuslimPrayers.DHUHR]: this.dateToTime(this.adhanService.dhuhr),
      [MuslimPrayers.ASR]: this.dateToTime(this.adhanService.asr),
      [MuslimPrayers.SUNSET]: this.dateToTime(this.adhanService.sunset),
      [MuslimPrayers.MAGHRIB]: this.dateToTime(this.adhanService.maghrib),
      [MuslimPrayers.ISHA]: this.dateToTime(this.adhanService.isha),
    });
  }

  private dateToTime(inputDatetime: Date): string {
    const dtObject = new Date(inputDatetime);

    // Extract time
    const hours = dtObject.getUTCHours().toString().padStart(2, '0');
    const minutes = dtObject.getUTCMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  }
}
