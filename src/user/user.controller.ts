import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';

@Controller('user')
export class UserController {
  @Post()
  createUser(@Body() createUser: CreateUserDto) {
    return createUser;
  }
}
