import { Injectable } from '@nestjs/common';
import { StateRepository } from './repository/state-repository';
import { StateEntity } from './entity/state.entity';

@Injectable()
export class StateService {
  constructor(private readonly stateRepository: StateRepository) {}

  async getAllStates(): Promise<StateEntity[]> {
    return this.stateRepository.getAllStates();
  }
}
