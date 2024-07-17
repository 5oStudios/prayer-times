import { HadithLanguage } from '../../interfaces/hadith-strategy.interface';
import {
  getAllHadithArabic,
  getAllHadithEnglish,
  getAllRoots,
} from './hadeeth/actions';

export type HadithOfflineProps = {
  index: number;
  categoryId?: number;
  page?: number;
  perPage?: number;
};

export class OfflineClient {
  private lang: HadithLanguage;
  constructor(lang: HadithLanguage) {
    this.lang = lang;
  }

  async getCategoryRoots() {
    return await getAllRoots();
  }
  async getHadithList({
    index,
    categoryId,
    page,
    perPage,
  }: HadithOfflineProps): Promise<string[]> {
    if (this.lang === 'ARABIC') {
      return await getAllHadithArabic(index);
    } else {
      return await getAllHadithEnglish(index);
    }
  }
}
