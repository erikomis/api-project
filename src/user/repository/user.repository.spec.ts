import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from '../entites/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/createUser.dto';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let mockRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    mockRepository = module.get(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      password: 'password',
      name: 'Test User',
      phone: '123456789',
      cpf: '12345678900',
    };

    const userEntity = new UserEntity();

    jest.spyOn(mockRepository, 'create').mockReturnValue(userEntity);

    jest.spyOn(mockRepository, 'save').mockResolvedValue(userEntity);

    const result = await userRepository.createUser(createUserDto);

    expect(result).toEqual(userEntity);
  });

  it('should find a user by email', async () => {
    const email = 'test@example.com';

    const userEntity = new UserEntity();

    jest.spyOn(mockRepository, 'findOne').mockResolvedValue(userEntity);

    const result = await userRepository.findByEmail(email);

    expect(result).toEqual(userEntity);
  });

  it('should  NOT find a user by email', async () => {
    const email = 'test@example.com';

    jest.spyOn(mockRepository, 'findOne').mockResolvedValue(null);

    const result = await userRepository.findByEmail(email);

    expect(result).toBeNull();
  });

  it('should find a user by id', async () => {
    const id = 1;

    const userEntity = new UserEntity();

    jest.spyOn(mockRepository, 'findOne').mockResolvedValue(userEntity);

    const result = await userRepository.findById(id);

    expect(result).toEqual(userEntity);
  });

  it('should  NOT find a user by id', async () => {
    const id = 1;

    jest.spyOn(mockRepository, 'findOne').mockResolvedValue(null);

    const result = await userRepository.findById(id);

    expect(result).toBeNull();
  });
});
