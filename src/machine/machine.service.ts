import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MachineDto } from './dto';
import { Prisma } from '@prisma/client';
import { EditMachineDto } from './dto/edit-machine.dto';

@Injectable()
export class MachineService {
  constructor(private prisma: PrismaService) {}

  async createMachine(dto: MachineDto) {
    try {
      dto.modelId = +dto.modelId;
      let machine = await this.prisma.machine.create({ data: dto });
      return machine;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      )
        throw new ConflictException('Model Sudah Terdaftar');

      throw error;
    }
  }

  async getMachine() {
    return await this.prisma.machine.findMany();
  }

  async getMachineById(id: number) {
    let machine = await this.prisma.machine.findUnique({ where: { id } });

    if (!machine) throw new NotFoundException('Laptop Tidak Terdaftar');
    return machine;
  }

  async editMachineById(dto: EditMachineDto, id: number) {
    try {
      const laptop = await this.prisma.machine.findUnique({ where: { id } });

      if (!laptop) throw { message: 'Not Found' };

      return await this.prisma.machine.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      if (error.message === 'Not Found')
        throw new NotFoundException('Laptop Tidak Terdaftar');

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      )
        throw new ConflictException('Laptop Sudah Terdaftar');
    }
  }

  async deleteMachineById(id: number) {
    try {
      const machine = await this.prisma.machine.findUnique({ where: { id } });

      if (!machine) throw { message: 'Not Found' };

      await this.prisma.machine.delete({ where: { id } });

      return { message: `Sukses delete laptop ${machine.name}` };
    } catch (error) {
      if (error.message === 'Not Found')
        throw new NotFoundException('Laptop Tidak Di Temukan');
    }
  }
}
