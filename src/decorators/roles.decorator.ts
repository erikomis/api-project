import { SetMetadata } from '@nestjs/common';
import { UserType } from 'src/user/enum/user-type.enum';

export const Roles_key = 'roles';

export const Roles = (...roles: UserType[]) => SetMetadata(Roles_key, roles);
