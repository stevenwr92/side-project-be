import { Module } from '@nestjs/common';
import { OutletService } from './outlet.service';

@Module({
  providers: [OutletService]
})
export class OutletModule {}
