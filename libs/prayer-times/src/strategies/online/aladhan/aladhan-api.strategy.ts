import { DefaultService as aladanService } from '../aladhan/api-sdk';
import { MuslimPrayers, OnlinePrayerTimesStrategy } from '../../../interfaces';

export enum OnlineCalculationEnum {
  Shia_Ithna_Ashari = 0,
  University_of_Islamic_Sciences_Karachi = 1,
  Islamic_Society_of_North_America = 2,
  Muslim_World_League = 3,
  Umm_Al_Qura_University_Makkah = 4,
  Egyptian_General_Authority_of_Survey = 5,
  Institute_of_Geophysics_University_of_Tehran = 7,
  Gulf_Region = 8,
  Kuwait = 9,
  Qatar = 10,
  Majlis_Ugama_Islam_Singapura_Singapore = 11,
  Union_Organization_Islamic_de_France = 12,
  Diyanet_Isleri_Baskanligi_Turkey = 13,
  Spiritual_Administration_of_Muslims_of_Russia = 14,
  Moonsighting_Committee_Worldwide = 15,
  Dubai = 16,
  // Special value for default
  Default = 99,
}
export type OnlineCalculationMethod = keyof typeof OnlineCalculationEnum;

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
    method: OnlineCalculationMethod;
    date: Date;
  }) {
    const { data } = await aladanService.getTimings({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      date: this.formatDate(date),
      method: OnlineCalculationEnum[method],
      iso8601: true,
    })

    if (!data?.timings) {
      throw new Error(
        'AlAdan Online API Service (aladhan.com) is not available'
      );
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
