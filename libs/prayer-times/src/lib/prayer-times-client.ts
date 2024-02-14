import { PrayerTimes } from 'adhan';
import { Strategies } from '../interfaces';
import { Schools } from '../interfaces/schools.interface';
import { OfflineClient, OnlineClient } from '../strategies';
import { OnlineCalculationMethod } from '../strategies/online/aladhan/aladhan-api.strategy';
import { OfflineCalculationMethod } from '../strategies/offline/adhan/adhan-package.strategy';

export class PrayerTimesClient<T extends keyof typeof Strategies> {
  private readonly client: OnlineClient | OfflineClient | undefined;
  constructor(
    private readonly props: {
      strategy: T;
      region: T extends Strategies.OFFLINE
        ? OfflineCalculationMethod
        : OnlineCalculationMethod;
      school: Schools;
    }
  ) {
    console.log('PrayerTimesClient', props);

    switch (props.strategy) {
      case 'ONLINE':
        this.client = new OnlineClient(props.region);
        break;
      case 'OFFLINE':
        this.client = new OfflineClient(props.region);
        break;
    }
  }

  getTimings({
    date,
    coordinates,
  }: {
    coordinates: ConstructorParameters<typeof PrayerTimes>[0];
    date: ConstructorParameters<typeof PrayerTimes>[1];
  }) {
    if (!this.client) {
      throw new Error('Client not available');
    }
    return this.client.getTimings({
      date,
      coordinates,
      method: 1,
    });
  }
}
