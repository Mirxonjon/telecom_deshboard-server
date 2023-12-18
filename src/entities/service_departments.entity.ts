import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GroupsEntity } from './group.entity';
import { DepartmentsEntity } from './departments.entity';

@Entity()
export class ServicesDepartmentsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
  })
  title: string;

  @CreateDateColumn({ name: 'created_at' })
  create_data: Date;

  @OneToMany(
    () => DepartmentsEntity,
    (departmet) => departmet.service_departments,
    {
      cascade: true,
    },
  )
  departments: DepartmentsEntity[];
}
