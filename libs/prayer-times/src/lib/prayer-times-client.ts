import { CalculationMethod, Coordinates, PrayerTimes } from 'adhan';
import { AdhanStrategy } from '../strategies/offline/adhan/adhan.strategy';
import { Strategies } from '../interfaces/strategies.interface';
import { Schools } from '../interfaces/schools.interface';
import { OfflineClient, OnlineClient } from '../strategies';

export function prayerTimes(): string {
  const coordinates = new Coordinates(12.9715987, 77.5945667);
  const params = CalculationMethod.Kuwait();
  const date = new Date();
  const prayerTimes = new AdhanStrategy(coordinates, date, params);
  console.log(prayerTimes);
  return 'Prayer Times';
}

export class PrayerTimesClient {
  private readonly clients: {
    [key in Strategies]: OfflineClient | OnlineClient;
  };
  constructor(
    private readonly props: {
      strategy: Strategies;
      region: ConstructorParameters<typeof PrayerTimes>[2]['method'];
      school: Schools;
    }
  ) {
    this.clients = {
      [Strategies.OFFLINE]: new OfflineClient({
        param: CalculationMethod[this.props.region ?? 'Egyptian'](),
      }),
      [Strategies.ONLINE]: new OnlineClient(),
    };
  }

  getTimings({
    date,
    coordinates,
  }: {
    coordinates: ConstructorParameters<typeof PrayerTimes>[0];
    date: ConstructorParameters<typeof PrayerTimes>[1];
  }) {
    return this.clients[this.props.strategy].getTimings({
      date,
      coordinates,
      method: 1,
    });
  }
}
