import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StateEntity } from '../entity/state.entity';

@Injectable()
export class StateRepository {
  constructor(
    @InjectRepository(StateEntity)
    private readonly userRepository: Repository<StateEntity>,
  ) {}

  async getAllStates(): Promise<StateEntity[]> {
    return this.userRepository.find({
      select: ['id', 'name', 'createdAt', 'updatedAt'],
    });
  }
}
