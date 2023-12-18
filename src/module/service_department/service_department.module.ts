import { Module } from '@nestjs/common';
import { ServiceDepartmentController } from './service_department.controller';
import { ServiceDepartmenService } from './service_department.service';

@Module({
  controllers: [ServiceDepartmentController],
  providers: [ServiceDepartmenService],
})
export class ServiceDepartmentModule {}
