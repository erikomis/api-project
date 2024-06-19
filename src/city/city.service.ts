import { Injectable } from '@nestjs/common';
import { CityEntity } from './entities/city.entity';
import { CityRepository } from './repository/citiy.repository';

import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class CityService {
  constructor(
    private cacheManager: CacheService,
    private readonly cityRepository: CityRepository,
  ) {}

  async getAllCitiesbyStateId(stateId: number): Promise<CityEntity[]> {
    return this.cacheManager.getCache<CityEntity[]>(
      stateId.toString(),
      async () => {
        return this.cityRepository.getAllCitiesbyStateId(stateId);
      },
    );
  }
}
