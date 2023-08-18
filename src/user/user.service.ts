import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUser, EditUser, UserResponse } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as argon from 'argon2';
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

  async createUser(dto: CreateUser) {
    try {
      const hash = await argon.hash(dto.password);
      dto.password = hash;
      let user = await this.prisma.user.create({
        data: dto,
      });
      delete user.password;

      return user;
    } catch (error) {
      console.log(error);
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      )
        throw new ConflictException(`${error.meta.target} Sudah Terdaftar`);
    }
  }

  async editUserById(dto: EditUser, id: number) {
    try {
      console.log(dto);
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) throw { message: 'Not Found' };
      await this.prisma.user.update({
        where: { id },
        data: dto,
      });

      return {
        message: `Sukses Edit User ${user.name}`,
      };
    } catch (error) {
      if (error.message === 'Not Found')
        throw new NotFoundException('User Tidak Di Temukan');

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      )
        throw new NotFoundException('User Sudah Terdaftar');
    }
  }
  async deleteUserByid(id: number) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) throw { message: 'Not Found' };
      await this.prisma.user.delete({ where: { id } });
      return {
        message: `Sukses delete user ${user.name}`,
        data: user.id,
      };
    } catch (error) {
      if (error.message === 'Not Found')
        throw new NotFoundException('User Tidak Di Temukan');
    }
  }
}
