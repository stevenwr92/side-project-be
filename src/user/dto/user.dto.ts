import { Exclude, Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UserResponse {
  id: number;
  email: string;
  @Exclude()
  password: string;
  phoneNumber: string;
  role: string;

  @Transform(({ value }) => value.toUpperCase())
  name: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<UserResponse>) {
    Object.assign(this, partial);
  }
}

export class EditUser {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  role: string;
}

export class CreateUser {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @Length(5, 10)
  password: string;

  @Length(10, 13)
  @IsString()
  phoneNumber: string;

  @IsString()
  role: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
