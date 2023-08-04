import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { UserResponse } from 'src/user/dto';
export class CreateOutletDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @Length(10, 12)
  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @Transform(({ value }) => +value)
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

export class OutletDto {
  id: number;
  name: string;
  location: string;
  address: string;
  phoneNumber: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  userId: number;

  @Type(() => UserResponse) // Use Type decorator to specify the nested DTO for User
  @Expose({ name: 'personInCharge' })
  user: UserResponse;

  constructor(partial: Partial<OutletDto>) {
    Object.assign(this, partial);
  }
}
