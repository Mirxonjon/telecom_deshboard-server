import { Module } from '@nestjs/common';
import { DecreeTimeController } from './decreetime.controller';
import { DecreeTimeService } from './decreetime.service';

@Module({
  controllers: [DecreeTimeController],
  providers: [DecreeTimeService],
})
export class DecreeTimeModule {}
