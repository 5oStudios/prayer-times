import { PrayerTimes } from 'adhan';
import { OnlinePrayerTimesStrategy } from '../../interfaces';
import { AladhanApiStrategy } from './aladhan/aladhan-api.strategy';

export class OnlineClient {
  private readonly onlineService: OnlinePrayerTimesStrategy;
  constructor() {
    this.onlineService = new AladhanApiStrategy();
  }

  public async getTimings({
    date,
    coordinates,
    method,
  }: {
    coordinates: ConstructorParameters<typeof PrayerTimes>[0];
    date: ConstructorParameters<typeof PrayerTimes>[1];
    method: ConstructorParameters<typeof PrayerTimes>[2]['method'];
  }) {
    return this.onlineService.getTimings({ date, coordinates, method });
  }
}
