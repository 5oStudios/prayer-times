import { Strategies } from '../interfaces';
import { Schools } from '../interfaces/schools.interface';
import { OfflineClient, OfflineClientProps, OnlineClient } from '../strategies';
import { OnlineCalculationMethod } from '../strategies/online/aladhan/aladhan-api.strategy';
import { OfflineCalculationMethod } from '../strategies/offline/adhan/adhan-package.strategy';
import moment = require('moment');

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
      school: keyof typeof Schools;
    },
  ) {
    switch (props.strategy) {
      case 'ONLINE':
        this.client = new OnlineClient(props.region as OnlineCalculationMethod);
        break;
      case 'OFFLINE':
        this.client = new OfflineClient(
          props.region as unknown as OfflineClientProps,
        );
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
    return this.client
      .getTimings({
        date,
        coordinates,
      })
      .then((timings) => {
        return Object.entries(timings).reduce((acc, [key, value]) => {
          // @ts-expect-error key is keyof MuslimPrayers
          acc[key] = moment(value).format('h:mm A');
          return acc;
        }, {});
      });
  }
}
