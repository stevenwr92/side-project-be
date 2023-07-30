import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ModelDto } from './dto';
import { ModelService } from './model.service';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('model')
export class ModelController {
  constructor(private ModelService: ModelService) {}
  @Post()
  createModel(@Body() dto: ModelDto) {
    return this.ModelService.createModel(dto);
  }

  @Get()
  getModel() {
    return this.ModelService.getModel();
  }
  @Get(':id')
  getModelById(@Param('id', ParseIntPipe) modelId: number) {
    return this.ModelService.getModelById(modelId);
  }

  @Patch(':id')
  editModelById(
    @Body() dto: ModelDto,
    @Param('id', ParseIntPipe) modelId: number,
  ) {
    return this.ModelService.editModelById(dto, modelId);
  }

  @Delete(':id')
  deleteModelById(@Param('id', ParseIntPipe) modelId: number) {
    return this.ModelService.deleteModelById(modelId);
  }
}
