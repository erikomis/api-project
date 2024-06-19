import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({
    message: 'Nome tem que ser uma string',
  })
  name: string;
  @IsString({
    message: 'Email tem que ser uma string',
  })
  @IsEmail()
  email: string;

  @IsString({
    message: 'Nome tem que ser uma string',
  })
  @MinLength(6, {
    message: 'Senha tem que ter no mínimo 6 caracteres',
  })
  @MaxLength(20, {
    message: 'Senha tem que ter no máximo 20 caracteres',
  })
  password: string;
  @IsString({
    message: 'Nome tem que ser uma string',
  })
  phone: string;
  @IsString({
    message: 'Nome tem que ser uma string',
  })
  cpf: string;
}
