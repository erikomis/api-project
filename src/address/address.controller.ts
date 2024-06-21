import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressService } from './address.service';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { AuthGuard } from '../guards/auth.guard';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @UseGuards(AuthGuard)
  @Roles(UserType.User)
  @Post('/:userId')
  public async createAddress(
    @Body() createAddressDto: CreateAddressDto,
    @Param('userId') userId: number,
  ) {
    return await this.addressService.createAddress(createAddressDto, userId);
  }

  @UseGuards(AuthGuard)
  @Roles(UserType.User, UserType.Admin)
  @Post('/:userId')
  public async findAddressByUserId(@Param('userId') userId: number) {
    return await this.addressService.findAddressByUserId(userId);
  }
}
