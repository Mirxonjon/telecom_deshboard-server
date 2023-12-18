import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmenService } from './department.service';

@Module({
  controllers: [DepartmentController],
  providers: [DepartmenService],
})
export class DepartmentModule {}
