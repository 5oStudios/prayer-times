import { DefaultService as aladanService } from '../aladhan/api-sdk';
import { OnlinePrayerTimesInterface } from '../../../interfaces/prayer-times.interface';

export class AladanApiStrategy implements OnlinePrayerTimesInterface {
  async getTimings({
    date,
    coordinates,
    method,
  }: {
    coordinates: {
      latitude: number;
      longitude: number;
    };
    method: number;
    date: Date;
  }) {
    const { data } = await aladanService.getTimings({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      date: this.formatDate(date),
      method,
    });

    console.log(this.formatDate(date));
    console.log(data?.timings);
    if (!data?.timings) {
      throw new Error('AlAdan Online Service not initialized');
    }
    return {
      fajr: data.timings['Fajr'],
      sunrise: data.timings['Sunrise'],
      dhuhr: data.timings['Dhuhr'],
      asr: data.timings['Asr'],
      sunset: data.timings['Sunset'],
      maghrib: data.timings['Maghrib'],
      isha: data.timings['Isha'],
    };
  }

  private formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
}
