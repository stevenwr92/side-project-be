import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTroubleShootDto } from './dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TroubleshootService {
  constructor(private prisma: PrismaService) {}

  async createTroubleShoot(dto: CreateTroubleShootDto) {
    try {
      let troubleShoot = await this.prisma.troubleShoot.create({ data: dto });
      return { message: `Sukses Menambah Trouble Shoot ${troubleShoot.name}` };
    } catch (error) {
      console.log(error);
    }
  }

  async getTroubleShoot() {
    let troubleShoots = await this.prisma.troubleShoot.findMany();
    return troubleShoots;
  }

  async getTroubleShootById(id) {
    let troubleShoot = await this.prisma.troubleShoot.findFirst({
      where: { id },
    });
    if (!troubleShoot)
      throw new NotFoundException('TroubleShoot Tidak Di Temukan');

    return troubleShoot;
  }

  async editTroubleShootById(dto: CreateTroubleShootDto, id: number) {
    try {
      const troubleShoot = await this.prisma.troubleShoot.findUnique({
        where: { id },
      });
      if (!troubleShoot) throw { message: 'Not Found' };
      return await this.prisma.troubleShoot.update({
        where: { id },
        data: { ...dto },
      });
    } catch (error) {
      if (error.message === 'Not Found')
        throw new NotFoundException('Trouble Shoot Tidak Terdaftar');
    }
  }

  async deleteTroubleShootById(id: number) {
    const troubleShoot = await this.prisma.troubleShoot.findUnique({
      where: { id },
    });
    if (!troubleShoot)
      throw new NotFoundException('TroubleShoot Tidak Di Temukan');

    await this.prisma.outlet.delete({
      where: { id },
    });

    return { message: `Sukses delete troubleshoot ${troubleShoot.name}` };
  }
}
