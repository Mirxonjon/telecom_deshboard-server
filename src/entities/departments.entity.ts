import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ServicesDepartmentsEntity } from './service_departments.entity';
import { WorkersEntity } from './workers.entity';

@Entity()
export class DepartmentsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
  })
  title: string;

  @CreateDateColumn({ name: 'created_at' })
  create_data: Date;

  @OneToMany(() => WorkersEntity, (worker) => worker.department, {
    cascade: true,
  })
  workers: WorkersEntity[];

  @ManyToOne(
    () => ServicesDepartmentsEntity,
    (service_department) => service_department.departments,
    { onDelete: 'CASCADE' },
  )
  service_departments: ServicesDepartmentsEntity;
}
