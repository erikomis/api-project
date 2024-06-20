import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
