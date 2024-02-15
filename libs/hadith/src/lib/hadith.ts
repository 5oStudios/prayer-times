import { OnlineClient } from '../strategies/online/online.client';
import { HadithLanguage } from '../interfaces/hadith-strategy.interface';

export class HadithClient {
  private readonly client: OnlineClient;
  constructor(
    private readonly HadithClientProps: { language: HadithLanguage },
  ) {
    this.client = new OnlineClient(this.HadithClientProps.language);
  }

  async getCategoryRoots() {
    return this.client.getCategoryRoots();
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
    return this.client.getHadithList({ categoryId, page, perPage });
  }
}
