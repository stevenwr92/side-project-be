import {
  Controller,
  Get,
  Post,
  Patch,
  Req,
  UseGuards,
  Body,
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

  @Patch()
  editOutlet() {}

  @Get()
  getOutlet() {
    return this.OutletService.getOutlet();
  }
}
