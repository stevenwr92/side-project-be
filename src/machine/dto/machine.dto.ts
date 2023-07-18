import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MachineDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  number: string;

  @IsNotEmpty()
  modelId: number;

  @IsNotEmpty()
  @IsString()
  status: string;
}
