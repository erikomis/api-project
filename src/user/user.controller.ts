import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { IsPublic } from '../decorators/is-public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post()
  createUser(@Body() createUser: CreateUserDto) {
    return this.userService.createUser(createUser);
  }

  @Get('/all-users')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/:userId')
  getUserRelationsAddress(@Param('userId') userId: number) {
    return this.userService.getUserRelationsAddress(userId);
  }
}
