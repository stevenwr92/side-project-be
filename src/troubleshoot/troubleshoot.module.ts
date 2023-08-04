import { Module } from '@nestjs/common';
import { TroubleshootController } from './troubleshoot.controller';
import { TroubleshootService } from './troubleshoot.service';

@Module({
  providers: [TroubleshootService],
  controllers: [TroubleshootController],
})
export class TroubleshootModule {}
