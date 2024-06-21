import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressRepository } from './repository/address.repositoy';
import { AddressService } from './address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { UserEntity } from '../user/entites/user.entity';
import { CityEntity } from '../city/entities/city.entity';
import { UserRepository } from '../user/repository/user.repository';
import { CityRepository } from '../city/repository/citiy.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity, UserEntity, CityEntity])],
  controllers: [AddressController],
  providers: [
    AddressService,
    AddressRepository,
    UserRepository,
    CityRepository,
  ],
})
export class AddressModule {}
