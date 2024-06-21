import { Injectable, NotFoundException } from '@nestjs/common';

import { LoginDto } from './dtos/login.dto';
import { compare } from 'bcrypt';
import { LoginMapper } from './mapper/login.mapper';
import { JwtService } from '@nestjs/jwt';
import { LoginPayload } from './mapper/login-payload';
import { UserRepository } from '../user/repository/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: LoginDto) {
    const userExists = await this.userRepository.findByEmail(user.email);

    if (!userExists) {
      throw new NotFoundException('Email invalido ou senha incorreta');
    }
    const isMatch = await compare(user.password, userExists.password);
    if (!isMatch) {
      throw new NotFoundException('Email invalido ou senha incorreta');
    }

    const userMappper = new LoginMapper(
      userExists.id,
      userExists.name,
      userExists.email,
      userExists.phone,
      userExists.cpf,
      userExists.createdAt,
      userExists.updatedAt,
    );

    const payload = new LoginPayload(userExists.id, userExists.typeUser);
    return {
      acessToken: this.jwtService.sign({ payload }),
      user: userMappper,
    };
  }
}
