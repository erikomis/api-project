import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entites/user.entity';
import { hash } from 'bcrypt';
import { UserRepository } from './repository/user.repository';
import { NewUser } from './class-mapper/new-user';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(CreateUserDto: CreateUserDto): Promise<NewUser> {
    const existsEmail = await this.userRepository.findByEmail(
      CreateUserDto.email,
    );
    if (existsEmail) {
      throw new HttpException(
        'Email already exists or is invalid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const passwordHash = await hash(CreateUserDto.password, 10);

    const newUser = await this.userRepository.createUser({
      ...CreateUserDto,
      password: passwordHash,
    });

    const classNewUser = new NewUser(
      newUser.id,
      newUser.name,
      newUser.email,
      newUser.phone,
      newUser.cpf,
      newUser.createdAt,
      newUser.updatedAt,
    );

    return classNewUser;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    const users = await this.userRepository.getAllUsers();

    return users;
  }
}
