import { CancelablePromise, DefaultService } from './api-sdk';
import {
  HadithLanguage,
  HadithStrategyInterface,
} from '../../../interfaces/hadith-strategy.interface';

enum HadeethEncLanguageEnum {
  ARABIC = 'ar',
  ENGLISH = 'en',
}
export class HadeethEncStrategy implements HadithStrategyInterface {
  readonly service: typeof DefaultService;
  language: HadeethEncLanguageEnum;
  constructor(private readonly clientLanguage: HadithLanguage) {
    this.language = HadeethEncLanguageEnum[clientLanguage];
    this.service = DefaultService;
  }

  getCategoryRoots(): CancelablePromise<Record<string, unknown>> {
    return this.service.getApiV1CategoriesRoots({ language: this.language });
  }

  async getHadithList({
    categoryId,
    page,
    perPage,
  }: {
    categoryId?: number;
    page?: number;
    perPage?: number;
  }) {
    return this.service.getApiV1HadeethsList({
      language: this.language,
      categoryId,
      page,
      perPage,
    });
  }
}
