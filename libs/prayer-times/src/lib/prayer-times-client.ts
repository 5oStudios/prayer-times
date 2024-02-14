import { Strategies } from '../interfaces';
import { Schools } from '../interfaces/schools.interface';
import { OfflineClient, OnlineClient } from '../strategies';
import { OnlineCalculationMethod } from '../strategies/online/aladhan/aladhan-api.strategy';
import { OfflineCalculationMethod } from '../strategies/offline/adhan/adhan-package.strategy';

interface CalculationMethod {
  ONLINE: OnlineCalculationMethod;
  OFFLINE: OfflineCalculationMethod;
}
export class PrayerTimesClient<T extends keyof typeof Strategies> {
  private readonly client: OnlineClient | OfflineClient | undefined;
  constructor(
    private readonly props: {
      strategy: T;
      region: CalculationMethod[T];
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

  async getTimings({
    date,
    coordinates,
  }: {
    coordinates: {
      latitude: number;
      longitude: number;
    };
    date: Date;
  }) {
    if (!this.client) {
      throw new Error('Client not available');
    }
    return this.client.getTimings({
      date,
      coordinates,
      method: this.props.region,
    });
  }
}
