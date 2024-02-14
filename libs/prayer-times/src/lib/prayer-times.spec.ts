import { PrayerTimesClient } from './prayer-times-client';

describe('prayerTimes', () => {
  it('should work', () => {
    expect(
      new PrayerTimesClient({
        strategy: 'ONLINE',
        region: 'Egyptian_General_Authority_of_Survey',
        school: 'HANAFI',
      })
    ).toBeDefined();
  });
});
