import { Controller, Get, Param } from '@nestjs/common';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get('/:stateId')
  async getAllCitiesbyStateId(@Param('stateId') stateId: number) {
    return this.cityService.getAllCitiesbyStateId(stateId);
  }
}
