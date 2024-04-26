import {
  AdhanPackageStrategy,
  OfflineCalculationMethod,
} from './adhan/adhan-package.strategy';
import { CalculationMethod, PrayerTimes } from 'adhan';
import { Coordinates, SupportedPrayerTimes } from '../../interfaces';
import { prayerTimesAdapter } from '../../adapter';

export interface OfflineClientProps {
  param: OfflineCalculationMethod;
}
export class OfflineClient {
  private readonly params: ConstructorParameters<typeof PrayerTimes>[2];
  private times: SupportedPrayerTimes | undefined;

  constructor(readonly props: OfflineClientProps) {
    this.params = CalculationMethod[props.param ?? 'Kuwait']();
  }

  public async getTimings({
    date,
    coordinates,
  }: {
    coordinates: ConstructorParameters<typeof PrayerTimes>[0];
    date: ConstructorParameters<typeof PrayerTimes>[1];
  }) {
    this.times = await new AdhanPackageStrategy(
      coordinates,
      date,
      this.params,
    ).getTimings();
    return this.times;
  }

  async getNextPrayerTime({
    date,
    coordinates,
  }: {
    date: Date;
    coordinates: Coordinates;
  }) {
    if (!this.times) await this.getTimings({ date, coordinates });

    if (!this.times) throw new Error('Prayer times are not available');
    const adaptedTimes = prayerTimesAdapter(this.times);

    return adaptedTimes.find((time) => time.isNext);
  }
}
