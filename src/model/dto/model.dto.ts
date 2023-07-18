import { IsNotEmpty, IsString, Length } from 'class-validator';
export class ModelDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  modelNumber: string;

  @IsString()
  @IsNotEmpty()
  brand: string;
}
