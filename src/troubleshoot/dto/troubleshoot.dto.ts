import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { Exclude, Expose, Transform, Type } from 'class-transformer';

export class CreateTroubleShootDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  constructor(partial: Partial<CreateTroubleShootDto>) {
    Object.assign(this, partial);
  }
}
