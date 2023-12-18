import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AdminEntity } from 'src/entities/admin.entity';
import { ServicesEntity } from 'src/entities/service.entity';
import { ServicedateEntity } from 'src/entities/servicedata.entity';
import { GroupsEntity } from 'src/entities/group.entity';
import { dataServiceGroupEntity } from 'src/entities/dataServiceGroup';
import { dataGroupEntity } from 'src/entities/dataGroup.entity';
import { agentsDataStateEntity } from 'src/entities/agentsDataState.entity';
import { agentslockEntity } from 'src/entities/agentslock.entity';
import { ServicesDepartmentsEntity } from 'src/entities/service_departments.entity';
import { DepartmentsEntity } from 'src/entities/departments.entity';
import { WorkersEntity } from 'src/entities/workers.entity';
import { DecreeTimeEntity } from 'src/entities/decree_time.entity';

dotenv.config();

export const connectDb: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  password: String(process.env.DB_PASSWORD),
  username: process.env.DB_USERNAME,
  database: process.env.DATABASE,
  entities: [
    AdminEntity,
    ServicesEntity,
    ServicedateEntity,
    GroupsEntity,
    dataServiceGroupEntity,
    dataGroupEntity,
    agentsDataStateEntity,
    agentslockEntity,
    ServicesDepartmentsEntity,
    DepartmentsEntity,
    WorkersEntity,
    DecreeTimeEntity,
  ],
  autoLoadEntities: true,
  synchronize: true,
};
