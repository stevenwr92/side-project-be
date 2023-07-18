import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ModelDto } from './dto';
import { Prisma } from '@prisma/client';
import { machine } from 'os';

@Injectable()
export class ModelService {
  constructor(private prisma: PrismaService) {}
  async createModel(dto: ModelDto) {
    try {
      let model = await this.prisma.model.create({ data: dto });

      return model;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      )
        throw new ConflictException('Model Sudah Terdaftar');

      throw error;
    }
  }

  async getModel() {
    return await this.prisma.model.findMany({ include: { machines: true } });
  }

  async getModelById(id: number) {
    const model = await this.prisma.model.findFirst({
      where: { id },
      include: { machines: true },
    });
    if (!model) throw new NotFoundException('Model Tidak Terdaftar');
    return model;
  }

  async editModelById(dto: ModelDto, id: number) {
    try {
      const model = await this.prisma.model.findUnique({ where: { id } });
      if (!model) throw { message: 'Not Found' };

      return await this.prisma.model.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      if (error.message === 'Not Found')
        throw new NotFoundException('Model Tidak Terdaftar');

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      )
        throw new ConflictException('Model Sudah Terdaftar');
    }
  }

  async deleteModelById(id: number) {
    try {
      const model = await this.prisma.model.findUnique({
        where: { id },
      });

      if (!model) throw { message: 'Not Found' };

      await this.prisma.model.delete({
        where: { id },
      });

      return { message: `Sukses delete model ${model.name}` };
    } catch (error) {
      console.log(error);
      if (error.message === 'Not Found')
        throw new NotFoundException('Model Tidak Terdaftar');

      throw error;
    }
  }
}
