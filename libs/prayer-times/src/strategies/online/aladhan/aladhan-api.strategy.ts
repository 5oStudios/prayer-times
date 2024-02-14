import { DefaultService as aladanService } from '../aladhan/api-sdk';
import { MuslimPrayers, OnlinePrayerTimesStrategy } from '../../../interfaces';

export class AladhanApiStrategy implements OnlinePrayerTimesStrategy {
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

    if (!data?.timings) {
      throw new Error('AlAdan Online Service not initialized');
    }
    return {
      [MuslimPrayers.FAJR]: data.timings['Fajr'],
      [MuslimPrayers.SUNRISE]: data.timings['Sunrise'],
      [MuslimPrayers.DHUHR]: data.timings['Dhuhr'],
      [MuslimPrayers.ASR]: data.timings['Asr'],
      [MuslimPrayers.SUNSET]: data.timings['Sunset'],
      [MuslimPrayers.MAGHRIB]: data.timings['Maghrib'],
      [MuslimPrayers.ISHA]: data.timings['Isha'],
    };
  }

  private formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
}
