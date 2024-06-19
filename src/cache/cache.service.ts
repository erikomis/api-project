import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}
  async getCache<T>(
    key: string,

    functionRequest: () => Promise<T>,
  ) {
    const allData: T = await this.cacheManager.get(key);

    if (!allData) {
      const data = await functionRequest();
      await this.cacheManager.set(key, data);
      return data;
    }

    return allData;
  }

  async setCache(key: string, value: any) {
    return value;
  }

  async deleteCache(key: string) {
    return key;
  }
}
