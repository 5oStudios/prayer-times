import { PrayerTimesInterface } from '../../interfaces/prayer-times.interface';
import { AladanApiStrategy } from './aladhan/aladan-api.strategy';

export class OnlineClient
  extends AladanApiStrategy
  implements PrayerTimesInterface
{
  constructor() //   strategy: Strategies; // private override readonly props: {
  //   region: keyof typeof CalculationMethod;
  //   school: Schools;
  // }
  {
    super();
  }
}
