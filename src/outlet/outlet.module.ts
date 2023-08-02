import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { OutletService } from './outlet.service';
import { OutletController } from './outlet.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  providers: [OutletService],
  controllers: [OutletController],
  imports: [CacheModule.register()],
})
export class OutletModule {}
