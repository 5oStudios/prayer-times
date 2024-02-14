import { PrayerTimes } from 'adhan';
import { OnlinePrayerTimesStrategy } from '../../interfaces';
import {
  AladhanApiStrategy,
  OnlineCalculationMethod,
} from './aladhan/aladhan-api.strategy';

export class OnlineClient {
  private readonly onlineService: OnlinePrayerTimesStrategy;
  private readonly method: OnlineCalculationMethod;
  constructor(readonly props: OnlineCalculationMethod) {
    this.onlineService = new AladhanApiStrategy();
    this.method = props;
  }

  public async getTimings({
    date,
    coordinates,
  }: {
    coordinates: ConstructorParameters<typeof PrayerTimes>[0];
    date: ConstructorParameters<typeof PrayerTimes>[1];
  }) {
    return this.onlineService.getTimings({
      date,
      coordinates,
      method: this.method,
    });
  }
}
