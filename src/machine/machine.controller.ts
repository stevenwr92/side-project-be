import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { MachineService } from './machine.service';
import { MachineDto } from './dto';
import { EditMachineDto } from './dto/edit-machine.dto';

@Controller('machine')
export class MachineController {
  constructor(private MachineService: MachineService) {}

  @Post()
  createMachine(@Body() dto: MachineDto) {
    console.log(dto);
    return this.MachineService.createMachine(dto);
  }

  @Get()
  getMachine() {
    return this.MachineService.getMachine();
  }

  @Get(':id')
  getMachineById(@Param('id', ParseIntPipe) machineId: number) {
    return this.MachineService.getMachineById(machineId);
  }

  @Patch(':id')
  editMachineById(
    @Body() dto: EditMachineDto,
    @Param('id', ParseIntPipe) machineId: number,
  ) {
    return this.MachineService.editMachineById(dto, machineId);
  }

  @Delete(':id')
  deleteMachineById(@Param('id', ParseIntPipe) machineId: number) {
    return this.MachineService.deleteMachineById(machineId);
  }
}
