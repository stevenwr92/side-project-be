import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { TroubleshootService } from './troubleshoot.service';
import { CreateTroubleShootDto } from './dto';

@Controller('troubleshoot')
@UseGuards(JwtGuard)
export class TroubleshootController {
  constructor(private Troubleshoot: TroubleshootService) {}

  @Post()
  addTroubleShoot(@Body() dto: CreateTroubleShootDto) {
    return this.Troubleshoot.createTroubleShoot(dto);
  }

  @Get()
  getTroubleShoot() {
    return this.Troubleshoot.getTroubleShoot();
  }

  @Get(':id')
  getTroubleShootById(@Param('id', ParseIntPipe) troubleshootId: number) {
    return this.Troubleshoot.getTroubleShootById(troubleshootId);
  }

  @Patch(':id')
  editTroubleShootById(
    @Body() dto: CreateTroubleShootDto,
    @Param('id', ParseIntPipe) troubleShootId: number,
  ) {
    return this.Troubleshoot.editTroubleShootById(dto, troubleShootId);
  }

  @Delete(':id')
  deleteTroubleShootById(@Param('id', ParseIntPipe) troubleShootId: number) {
    return this.Troubleshoot.deleteTroubleShootById(troubleShootId);
  }
}
