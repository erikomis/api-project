import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressRepository } from './repository/address.repositoy';
import { AddressService } from './address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserEntity } from 'src/user/entites/user.entity';
import { CityRepository } from 'src/city/repository/citiy.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity, UserEntity])],
  controllers: [AddressController],
  providers: [
    AddressService,
    AddressRepository,
    UserRepository,
    CityRepository,
  ],
})
export class AddressModule {}
