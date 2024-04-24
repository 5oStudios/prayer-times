import * as db from '../assets/azkar.json';

enum AzkarEnum {
  morningRemembrances = 'أذكار الصباح',
  eveningRemembrances = 'أذكار المساء',
  afterPrayers = 'أذكار بعد السلام من الصلاة المفروضة',
  tasbih = 'تسابيح',
  sleepRemembrances = 'أذكار النوم',
  wakeupRemembrances = 'أذكار الاستيقاظ',
  quranicSupplications = 'أدعية قرآنية',
  propheticSupplications = 'أدعية الأنبياء',
}

export class AzkarClient {
  private readonly azkar: typeof db;

  constructor() {
    this.azkar = db;
  }

  // morningRemembrances() {
  //   return this.azkar[AzkarEnum.morningRemembrances];
  // }

  eveningRemembrances() {
    return this.azkar[AzkarEnum.eveningRemembrances];
  }

  afterPrayers() {
    return this.azkar[AzkarEnum.afterPrayers];
  }

  tasbih() {
    return this.azkar[AzkarEnum.tasbih];
  }

  sleepRemembrances() {
    return this.azkar[AzkarEnum.sleepRemembrances];
  }

  wakeupRemembrances() {
    return this.azkar[AzkarEnum.wakeupRemembrances];
  }

  quranicSupplications() {
    return this.azkar[AzkarEnum.quranicSupplications];
  }

  propheticSupplications() {
    return this.azkar[AzkarEnum.propheticSupplications];
  }
}

export interface Zekr {
  category: string;
  count: number;
  description: string;
  reference: string;
  content: string;
}
