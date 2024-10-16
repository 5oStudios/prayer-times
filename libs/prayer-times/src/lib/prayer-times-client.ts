import { Coordinates, Strategies } from '../interfaces';
import { OfflineClient, OfflineClientProps } from '../strategies';
import { OnlineCalculationMethod } from '../strategies/online/aladhan/aladhan-api.strategy';
import { OfflineCalculationMethod } from '../strategies/offline/adhan/adhan-package.strategy';
import { prayerTimesAdapter } from '../adapter';

interface CalculationMethod {
  ONLINE: OnlineCalculationMethod;
  OFFLINE: OfflineCalculationMethod;
}

export type Shifting = {
  fajr: number;
  dhuhr: number;
  sunrise: number;
  asr: number;
  maghrib: number;
  isha: number;
};

export class PrayerTimesClient<T extends keyof typeof Strategies> {
  private readonly client: OfflineClient;
  constructor(
    private readonly props: {
      strategy: T;
      region: CalculationMethod[T];
      // school: keyof typeof Schools;
    },
  ) {
    switch (props.strategy) {
      case 'ONLINE':
        throw new Error('Deprecated, please use OFFLINE strategy');
      case 'OFFLINE':
        this.client = new OfflineClient(
          props.region as unknown as OfflineClientProps,
        );
        break;
      default:
        this.client = new OfflineClient(
          props.region as unknown as OfflineClientProps,
        );
    }
  }

  async getTimings({
    date,
    coordinates,
    shifting,
  }: {
    coordinates: Coordinates;
    date: Date;
    shifting: Shifting;
  }) {
    if (!this.client) throw new Error('Client not available');

    const rawTimings = await this.client.getTimings({
      date,
      coordinates,
    });

    console.log('rawTimings', shifting);

    return prayerTimesAdapter(rawTimings, shifting);
  }
}
