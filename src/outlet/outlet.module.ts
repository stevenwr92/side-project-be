import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { OutletService } from './outlet.service';
import { OutletController } from './outlet.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  providers: [OutletService],
  controllers: [OutletController],
})
export class OutletModule {}
