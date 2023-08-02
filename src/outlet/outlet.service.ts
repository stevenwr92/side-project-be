import {
  ForbiddenException,
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOutletDto, OutletDto } from './dto';
import { Prisma } from '@prisma/client';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class OutletService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async createOutlet(dto: CreateOutletDto) {
    try {
      let outlet = await this.prisma.outlet.create({
        data: dto,
      });
      await this.cacheManager.del('outlets');
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
      let cacheOutlet = (await this.cacheManager.get('outlets')) as OutletDto[];
      if (cacheOutlet) return cacheOutlet;

      let outlets = await this.prisma.outlet.findMany();
      let outlet = outlets.map((outlet) => new OutletDto(outlet));

      await this.cacheManager.set('outlets', outlet, 10000);
      return outlet;
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

      await this.cacheManager.del('outlets');
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

      await this.cacheManager.del('outlets');
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
