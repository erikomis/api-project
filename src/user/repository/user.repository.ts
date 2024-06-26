import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entites/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/createUser.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(user: CreateUserDto): Promise<UserEntity> {
    const userCreate = this.userRepository.create(user);
    const newUser = await this.userRepository.save({
      ...userCreate,
      typeUser: 1,
    });
    return newUser;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email } });
  }
  async findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id } });
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find({
      select: ['id', 'name', 'email', 'phone', 'cpf', 'createdAt', 'updatedAt'],
    });
  }

  async getUserByIdUsingRelations(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'phone', 'cpf', 'createdAt', 'updatedAt'],
      relations: {
        addresses: {
          city: {
            state: true,
          },
        },
      },
    });
  }
}
