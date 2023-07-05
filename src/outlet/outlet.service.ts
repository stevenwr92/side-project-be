import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OutletDto } from './dto';

@Injectable()
export class OutletService {
  constructor(private prisma: PrismaService) {}
  async createOutlet(dto: OutletDto) {
    try {
      let outlet = await this.prisma.outlet.create({
        data: dto,
      });

      return outlet;
    } catch (error) {
      console.log(error);
    }
  }

  async getOutlet() {
    try {
      let outlet = await this.prisma.outlet.findMany();

      return outlet;
    } catch (error) {
      console.log(error);
    }
  }

  async getOutletById(id: number) {
    try {
      return this.prisma.outlet.findFirst({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async editOutletById(dto: OutletDto, id: number) {
    try {
      const outlet = await this.prisma.outlet.findUnique({
        where: {
          id,
        },
      });

      if (!outlet) throw new ForbiddenException('Data not found');

      return this.prisma.outlet.update({
        where: {
          id,
        },
        data: {
          ...dto,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteOutletById(id: number) {
    try {
      const outlet = await this.prisma.outlet.findUnique({
        where: {
          id,
        },
      });

      if (!outlet) throw new ForbiddenException('Data not found');

      await this.prisma.outlet.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
