import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OutletService {
  constructor(private prisma: PrismaService) {}
  async createOutlet(dto) {
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
}
