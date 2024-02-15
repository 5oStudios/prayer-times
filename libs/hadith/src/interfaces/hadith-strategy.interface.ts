import { CancelablePromise } from '../strategies/online/hadeeth-enc/api-sdk';

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
  }): CancelablePromise<Record<string, unknown>>;

  getCategoryRoots(): CancelablePromise<Record<string, unknown>>;
}
