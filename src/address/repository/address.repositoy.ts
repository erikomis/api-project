import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from '../entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from '../dtos/createAddress.dto';

@Injectable()
export class AddressRepository {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}

  async createAddress(createAddressDto: CreateAddressDto, userId: number) {
    const newAddress = await this.addressRepository.save({
      ...createAddressDto,
      userId,
    });

    return newAddress;
  }

  findAddressByUserId(userId: number) {
    return this.addressRepository.find({
      where: { userId },

      relations: {
        city: {
          state: true,
        },
      },
    });
  }
}
