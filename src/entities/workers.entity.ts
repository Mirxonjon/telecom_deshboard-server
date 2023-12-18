import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DepartmentsEntity } from './departments.entity';
import { DecreeTimeEntity } from './decree_time.entity';

@Entity()
export class WorkersEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
  })
  name: string;

  @Column({
    type: 'character varying',
    length: 10,
    nullable: true,
  })
  employee_category: string;

  @Column({
    type: 'integer',
    nullable :true
  })
  login: Number;

  @Column({
    type: 'int',
    nullable: true,
  })
  tariff_discharge: number;

  @Column({
    type: 'character varying',
  })
  job_titles: string;

  @Column({
    type: 'character varying',
  })
  information: string;

  @Column({
    type: 'character varying',
  })
  gender: string;

  @Column({
    type: 'character varying',
  })
  date_of_birth: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  Pasport_id: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  pinfl: string;

  @Column({
    type: 'numeric',
    nullable: true,
  })
  experience: number;

  @Column({
    type: 'character varying',
  })
  phone_number: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  date_of_acceptance: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  date_of_last_change_position: string;

  @Column({
    type: 'character varying',
  })
  address: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  name_of_graduate_institution: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  about_family: string;
  @Column({
    type: 'character varying',
    nullable: true,
  })
  user_img: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  reference_img: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  military_ID_img: string;

  @Column({
    type: 'boolean',
    nullable: true,
    default: true,
  })
  IsActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  create_data: Date;

  @ManyToOne(() => DepartmentsEntity, (department) => department.workers, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'departmentId' })
  department: DepartmentsEntity;

  @OneToMany(() => DecreeTimeEntity, (degreetimes) => degreetimes.worker)
  Degree_times: DecreeTimeEntity[];
}
