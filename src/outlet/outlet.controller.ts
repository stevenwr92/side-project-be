import {
  Controller,
  Get,
  Post,
  Patch,
  Req,
  UseGuards,
  Body,
  ParseIntPipe,
  Param,
  Delete,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { OutletDto } from './dto';
import { OutletService } from './outlet.service';

@Controller('outlet')
// @UseGuards(JwtGuard)
export class OutletController {
  constructor(private OutletService: OutletService) {}
  @Post()
  addOutlet(@Body() dto: OutletDto) {
    return this.OutletService.createOutlet(dto);
  }

  @Patch(':id')
  editOutlet(
    @Param('id', ParseIntPipe)
    @Body()
    dto: OutletDto,
    outletId: number,
  ) {
    return this.OutletService.editOutletById(dto, outletId);
  }

  @Get()
  getOutlet() {
    return this.OutletService.getOutlet();
  }

  @Get(':id')
  getOutletById(
    @Param('id', ParseIntPipe)
    outletId: number,
  ) {
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
