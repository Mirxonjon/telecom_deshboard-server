import { Module } from '@nestjs/common';
import { AgentsController } from './agents.controller';
import { AgentsService } from './agents.service';

@Module({
  imports: [],
  controllers: [AgentsController],
  providers: [AgentsService],
})
export class AgentsModule {}
