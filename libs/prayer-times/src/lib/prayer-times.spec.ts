import { prayerTimes } from './prayer-times-client';

describe('prayerTimes', () => {
  it('should work', () => {
    expect(prayerTimes()).toEqual('prayer-times');
  });
});
