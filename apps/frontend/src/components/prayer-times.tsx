import { CalculationMethod, Coordinates, PrayerTimes } from 'adhan';

export function MyPrayerTimes() {
  if (typeof window !== 'undefined') {
    console.log('Geolocation supported');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('Latitude is :', position.coords.latitude);
        console.log('Longitude is :', position.coords.longitude);

        const coordinates = new Coordinates(
          position.coords.latitude,
          position.coords.longitude
        );
        const params = CalculationMethod.Egyptian();
        const date = new Date();
        const prayerTimes = new PrayerTimes(coordinates, date, params);

        console.log(prayerTimes.asr.toTimeString());
      });
    } else {
      console.log('Geolocation not supported');
    }
  }
  return <div>Prayer Times</div>;
}
