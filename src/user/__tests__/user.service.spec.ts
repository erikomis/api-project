import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserRepository } from '../repository/user.repository';

import { CreateUserDto } from '../dtos/createUser.dto';
import { hash } from 'bcrypt';
import { NewUser } from '../class-mapper/new-user';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserEntity } from '../entites/user.entity';
// describe('UserService', () => {
//   let service: UserService;
//   let userRepository: UserRepository;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         UserService,
//         {
//           provide: UserRepository,
//           useValue: {
//             createUser: jest.fn().mockResolvedValue(UserMockEntity),
//             findByEmail: jest.fn().mockResolvedValue(UserMockEntity),
//             findById: jest.fn().mockResolvedValue(UserMockEntity),
//             getAllUsers: jest.fn().mockResolvedValue([UserMockEntity]),
//             getUserByIdUsingRelations: jest
//               .fn()
//               .mockResolvedValue(UserMockEntity),
//           },
//         },
//       ],
//     }).compile();

//     service = module.get<UserService>(UserService);
//     userRepository = module.get<UserRepository>(UserRepository);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//     expect(userRepository).toBeDefined();
//   });
//   it('should create a user exist email', async () => {
//     const user = await service.createUser({
//       name: 'User Test',
//       email: 'teste2@gmail.com',
//       phone: '999999999',
//       cpf: '99999999999',
//       password: '123456',
//     });

//     expect(user).toEqual(UserMockEntity);
//   });
// });

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Partial<UserRepository>;

  beforeEach(async () => {
    userRepository = {
      findByEmail: jest.fn(),
      createUser: jest.fn(),
      getAllUsers: jest.fn(),
      getUserByIdUsingRelations: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useValue: userRepository },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });
  describe('createUser', () => {
    it('should create a new user successfully', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
        phone: '123456789',
        cpf: '12345678900',
      };

      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(userRepository, 'createUser').mockResolvedValue({
        id: 1,
        ...createUserDto,
        typeUser: 1,
        password: await hash(createUserDto.password, 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const newUser = await userService.createUser(createUserDto);

      expect(newUser).toEqual(
        new NewUser(
          1,
          createUserDto.name,
          createUserDto.email,
          createUserDto.phone,
          createUserDto.cpf,
          expect.any(Date),
          expect.any(Date),
        ),
      );
    });

    it('should throw an error if email already exists', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
        phone: '123456789',
        cpf: '12345678900',
      };

      jest
        .spyOn(userRepository, 'findByEmail')
        .mockResolvedValue({} as UserEntity);

      await expect(userService.createUser(createUserDto)).rejects.toThrow(
        new HttpException(
          'Email already exists or is invalid',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const users: UserEntity[] = [
        {
          id: 1,
          email: 'test1@example.com',
          name: 'User One',
          phone: '111111111',
          cpf: '11111111111',
          typeUser: 1,
          password: 'hashedpassword1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          email: 'test2@example.com',
          name: 'User Two',
          phone: '222222222',
          cpf: '22222222222',
          typeUser: 2,
          password: 'hashedpassword2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(userRepository, 'getAllUsers').mockResolvedValue(users);

      const result = await userService.getAllUsers();

      expect(result).toEqual(users);
    });
  });

  describe('getUserRelationsAddress', () => {
    it('should return user with relations by id', async () => {
      const user: UserEntity = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        phone: '123456789',
        cpf: '12345678900',
        typeUser: 1,
        password: 'hashedpassword',
        createdAt: new Date(),
        updatedAt: new Date(),
        addresses: [],
      };

      jest
        .spyOn(userRepository, 'getUserByIdUsingRelations')
        .mockResolvedValue(user);

      const result = await userService.getUserRelationsAddress(1);

      expect(result).toEqual(user);
    });
  });
});
