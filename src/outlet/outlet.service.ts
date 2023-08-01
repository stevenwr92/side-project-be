import {
  ForbiddenException,
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOutletDto, OutletDto } from './dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class OutletService {
  constructor(private prisma: PrismaService) {}
  async createOutlet(dto: CreateOutletDto) {
    try {
      let outlet = await this.prisma.outlet.create({
        data: dto,
      });
      return outlet;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002' &&
        error.meta.target === 'name'
      )
        throw new ConflictException('Outlet Sudah Terdaftar');

      throw new ConflictException('Staff sudah di assign di tempat lain');
    }
  }

  async getOutlet(): Promise<OutletDto[]> {
    try {
      let outlets = await this.prisma.outlet.findMany();

      return outlets.map((outlet) => new OutletDto(outlet));
    } catch (error) {
      console.log(error);
    }
  }

  async getOutletById(id: number): Promise<OutletDto> {
    const outlet = await this.prisma.outlet.findFirst({
      where: { id },
      include: { user: true },
    });
    if (!outlet) throw new NotFoundException('Outlet Tidak Terdaftar');
    return new OutletDto(outlet);
  }

  async editOutletById(dto: CreateOutletDto, id: number) {
    try {
      const outlet = await this.prisma.outlet.findUnique({
        where: { id },
      });

      if (!outlet) throw { message: 'Not Found' };

      return await this.prisma.outlet.update({
        where: { id },
        data: { ...dto },
      });
    } catch (error) {
      if (error.message === 'Not Found')
        throw new NotFoundException('Outlet Tidak Terdaftar');

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      )
        throw new ConflictException('Outlet Sudah Terdaftar');
    }
  }

  async deleteOutletById(id: number) {
    try {
      const outlet = await this.prisma.outlet.findUnique({
        where: { id },
      });

      if (!outlet) throw { message: 'Not Found' };

      await this.prisma.outlet.delete({
        where: { id },
      });

      return { message: `Sukses delete outlet ${outlet.name}` };
    } catch (error) {
      if (error.message === 'Not Found')
        throw new NotFoundException('Outlet Tidak Terdaftar');
    }
  }
}
