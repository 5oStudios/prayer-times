import {
  HadithLanguage,
  HadithStrategyInterface,
} from '../../interfaces/hadith-strategy.interface';
import { HadeethEncStrategy } from './hadeeth-enc/hadeeth-enc.strategy';
import { CancelablePromise } from './hadeeth-enc/api-sdk';

export class OnlineClient implements OnlineClientInterface {
  private readonly strategy: HadithStrategyInterface;

  constructor(private readonly language: HadithLanguage) {
    this.strategy = new HadeethEncStrategy(this.language);
  }

  getCategoryRoots(): CancelablePromise<Record<string, unknown>> {
    return this.strategy.getCategoryRoots();
  }

  getHadithList({
    categoryId,
    page,
    perPage,
  }: {
    categoryId?: number;
    page?: number;
    perPage?: number;
  }): CancelablePromise<Record<string, unknown>> {
    return this.strategy.getHadithList({ categoryId, page, perPage });
  }
}

interface OnlineClientInterface {
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
