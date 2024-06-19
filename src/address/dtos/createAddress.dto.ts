import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsOptional()
  public readonly complement: string;

  @IsInt()
  public readonly numberAddress: number;

  @IsString()
  public readonly cep: string;

  @IsInt()
  public readonly cityId: number;
}
