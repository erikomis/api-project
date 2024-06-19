import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { CityRepository } from './repository/citiy.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { CacheModuleProject } from 'src/cache/cache.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      ttl: 9999,
    }),
    TypeOrmModule.forFeature([CityEntity]),
    CacheModuleProject,
  ],
  controllers: [CityController],
  providers: [CityService, CityRepository],
  exports: [CityRepository],
})
export class CityModule {}
