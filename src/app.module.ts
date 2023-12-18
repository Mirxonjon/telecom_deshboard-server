import { CacheModuleOptions, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { connectDb } from './config/typeorm';
import { EventModule } from './module/events/events.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TelegrafModule } from 'nestjs-telegraf';
import { AgentsModule } from './module/agents/agents.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ServiceDepartmentModule } from './module/service_department/service_department.module';
import { DepartmentModule } from './module/department/department.module';
import { WorkerModule } from './module/workers/worker.module';
import { DecreeTimeModule } from './module/degree_time/decreetime.module';

@Module({
  imports: [
    ConfigModule.forRoot(config),
    TypeOrmModule.forRoot(connectDb),
    ScheduleModule.forRoot(),
    TelegrafModule.forRoot({
      token: '5994786340:AAHQOpj10D8Bi0XhgQpYD14hDoHogp3Q0z8',
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: (): CacheModuleOptions => ({
        ttl: 3600000,
      }),
    }),
    EventModule,
    AgentsModule,
    ServiceDepartmentModule,
    DepartmentModule,
    WorkerModule,
    DecreeTimeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
