import { CancelablePromise } from '../strategies/online/hadeeth-enc/api-sdk';
import { Hadith, OnlineAPIResponse } from './hadith';

export enum HadithLanguageEnum {
  ARABIC,
  ENGLISH,
}
export type HadithLanguage = keyof typeof HadithLanguageEnum;
export interface HadithStrategyInterface {
  getHadithList({
    categoryId,
    page,
    perPage,
  }: {
    categoryId?: number;
    page?: number;
    perPage?: number;
  }): Promise<OnlineAPIResponse<Hadith[]>>;

  getCategoryRoots(): CancelablePromise<Record<string, unknown>>;
}
