import { Repository } from 'typeorm';
import { CityEntity } from '../entities/city.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CityRepository {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}

  async getAllCitiesbyStateId(stateId: number): Promise<CityEntity[]> {
    const cities = await this.cityRepository.find({
      where: {
        stateId,
      },
    });
    return cities;
  }

  async getCityById(id: number): Promise<CityEntity> {
    const city = await this.cityRepository.findOne({
      where: {
        id,
      },
    });
    return city;
  }
}
