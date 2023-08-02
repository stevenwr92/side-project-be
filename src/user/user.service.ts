import { Injectable } from '@nestjs/common';
import { UserResponse } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUser(): Promise<UserResponse[]> {
    let users = await this.prisma.user.findMany({
      where: {
        role: {
          not: 'Admin',
        },
      },
    });
    return users.map((user) => new UserResponse(user));
  }
}
