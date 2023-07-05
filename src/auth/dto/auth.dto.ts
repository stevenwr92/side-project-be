import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
// import { Transform } from 'class-transformer';
export class AuthDto {
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

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  password: string;
}
