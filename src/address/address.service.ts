import { UserRepository } from 'src/user/repository/user.repository';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressEntity } from './entities/address.entity';
import { AddressRepository } from './repository/address.repositoy';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CityRepository } from 'src/city/repository/citiy.repository';

@Injectable()
export class AddressService {
  constructor(
    private readonly addressRepository: AddressRepository,
    private readonly userRepository: UserRepository,
    private readonly cityRepository: CityRepository,
  ) {}

  async createAddress(
    createAddressDto: CreateAddressDto,
    userId: number,
  ): Promise<AddressEntity> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException(`Usuario com id ${userId} não encontrado`);
    }
    const city = await this.cityRepository.getCityById(createAddressDto.cityId);
    if (!city) {
      throw new NotFoundException(
        `Cidade com id ${createAddressDto.cityId} não encontrada`,
      );
    }
    const newAddress = await this.addressRepository.createAddress(
      createAddressDto,
      userId,
    );

    return newAddress;
  }

  async findAddressByUserId(userId: number): Promise<AddressEntity[]> {
    const addresses = await this.addressRepository.findAddressByUserId(userId);

    if (!addresses) {
      throw new NotFoundException(`Endereço com id ${userId} não encontrado`);
    }

    return addresses;
  }
}
