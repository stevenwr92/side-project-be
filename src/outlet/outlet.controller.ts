import {
  Controller,
  Get,
  Post,
  Patch,
  UseGuards,
  Body,
  ParseIntPipe,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { CreateOutletDto, OutletDto } from './dto';
import { OutletService } from './outlet.service';

@Controller('outlet')
// @UseGuards(JwtGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class OutletController {
  constructor(private OutletService: OutletService) {}
  @Post()
  addOutlet(@Body() dto: CreateOutletDto) {
    return this.OutletService.createOutlet(dto);
  }

  @Patch(':id')
  editOutlet(
    @Param('id', ParseIntPipe)
    outletId: number,
    @Body()
    dto: CreateOutletDto,
  ) {
    return this.OutletService.editOutletById(dto, outletId);
  }

  @Get()
  getOutlet(): Promise<OutletDto[]> {
    return this.OutletService.getOutlet();
  }

  @Get(':id')
  getOutletById(
    @Param('id', ParseIntPipe)
    outletId: number,
  ): Promise<OutletDto> {
    return this.OutletService.getOutletById(outletId);
  }

  @Delete(':id')
  deleteOutletById(
    @Param('id', ParseIntPipe)
    outletId: number,
  ) {
    return this.OutletService.deleteOutletById(outletId);
  }
}
