import { OnlineClient } from '../strategies/online/online.client';
import { HadithLanguage } from '../interfaces/hadith-strategy.interface';
import { OfflineClient } from '../strategies/offline/offline.client';

export class HadithClient {
  private readonly client: OnlineClient | OfflineClient;
  constructor(
    private readonly HadithClientProps: {
      language: HadithLanguage;
      strategy: 'online' | 'offline';
    },
  ) {
    if (this.HadithClientProps.strategy === 'offline') {
      this.client = new OfflineClient(this.HadithClientProps.language);
    } else {
      this.client = new OnlineClient(this.HadithClientProps.language);
    }
  }

  async getCategoryRoots() {
    return this.client.getCategoryRoots();
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
    return this.client.getHadithList({
      index,
      categoryId,
      page,
      perPage,
    });
  }
}
