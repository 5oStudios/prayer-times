import { AdhanStrategy } from './adhan/adhan.strategy';
import { PrayerTimes } from 'adhan';

interface OfflineClientProps {
  param: ConstructorParameters<typeof PrayerTimes>[2];
}
export class OfflineClient {
  constructor(private readonly props: OfflineClientProps) {
    console.log('OfflineClient', props);
  }
  getTimings({
    date,
    coordinates,
  }: {
    coordinates: ConstructorParameters<typeof PrayerTimes>[0];
    date: ConstructorParameters<typeof PrayerTimes>[1];
  }) {
    return new AdhanStrategy(coordinates, date, this.props.param).getTimings();
  }
}
