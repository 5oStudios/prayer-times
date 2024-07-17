import {
  HadithLanguage,
  HadithStrategyInterface,
} from '../../interfaces/hadith-strategy.interface';
import { HadeethEncStrategy } from './hadeeth-enc/hadeeth-enc.strategy';
import { CancelablePromise } from './hadeeth-enc/api-sdk';

export class OnlineClient {
  private readonly strategy: HadithStrategyInterface;

  constructor(private readonly language: HadithLanguage) {
    this.strategy = new HadeethEncStrategy(this.language);
  }

  getCategoryRoots(): CancelablePromise<Record<string, unknown>> {
    return this.strategy.getCategoryRoots();
  }

  async getHadithList({
    index,
    categoryId,
    page,
    perPage,
  }: {
    index: number;
    categoryId?: number;
    page?: number;
    perPage?: number;
  }) {
    return this.strategy.getHadithList({ categoryId, page, perPage });
  }
}
