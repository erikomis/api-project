import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'O campo email deve ser do tipo string' })
  @IsEmail({}, { message: 'O campo email deve ser um email válido' })
  email: string;
  @IsString({ message: 'O campo password deve ser do tipo string' })
  @MinLength(6, { message: 'O campo password deve ter no mínimo 6 caracteres' })
  @MaxLength(20, {
    message: 'O campo password deve ter no máximo 20 caracteres',
  })
  password: string;
}
