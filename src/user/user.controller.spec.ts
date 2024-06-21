import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';

import { UserEntity } from './entites/user.entity';

import { HttpException, HttpStatus } from '@nestjs/common';

const UserMockEntity: UserEntity = {
  id: 1,
  name: 'User Test',
  email: 'teste2@gmail.com',
  phone: '999999999',
  cpf: '99999999999',
  password: 'hashedpassword',
  typeUser: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  addresses: [],
};

// Novo usuário de mock
const NewUserMock: {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  createdAt: Date;
  updatedAt: Date;
} = {
  id: 1,
  name: 'User Test',
  email: 'teste2@gmail.com',
  phone: '999999999',
  cpf: '99999999999',
  createdAt: new Date(),
  updatedAt: new Date(),
};
describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn().mockResolvedValue(NewUserMock),
            getAllUsers: jest.fn().mockResolvedValue([UserMockEntity]),
            getUserRelationsAddress: jest
              .fn()
              .mockResolvedValue(UserMockEntity),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should create user', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      password: 'password',
      name: 'Test User',
      phone: '123456789',
      cpf: '12345678900',
    };
    await expect(controller.createUser(createUserDto)).resolves.toEqual(
      NewUserMock,
    );
  });

  it('should handle error when creating user with existing email', async () => {
    const createUserDto: CreateUserDto = {
      name: 'User Test',
      email: 'teste2@gmail.com',
      phone: '999999999',
      cpf: '99999999999',
      password: '123456',
    };

    jest
      .spyOn(service, 'createUser')
      .mockRejectedValue(
        new HttpException(
          'Email already exists or is invalid',
          HttpStatus.BAD_REQUEST,
        ),
      );

    await expect(controller.createUser(createUserDto)).rejects.toThrow(
      new HttpException(
        'Email already exists or is invalid',
        HttpStatus.BAD_REQUEST,
      ),
    );
  });

  it('should return all users', async () => {
    await expect(controller.getAllUsers()).resolves.toEqual([UserMockEntity]);
  });

  it('should return a user with relations by ID', async () => {
    const userId = 1;
    await expect(controller.getUserRelationsAddress(userId)).resolves.toEqual(
      UserMockEntity,
    );
  });
});
