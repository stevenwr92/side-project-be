import { IsNotEmpty, IsString } from 'class-validator';

export class EditMachineDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  number: string;

  @IsNotEmpty()
  @IsString()
  status: string;
}
