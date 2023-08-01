import { Exclude, Transform } from 'class-transformer';

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
