import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { WorkersEntity } from './workers.entity';

@Entity()
export class DecreeTimeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  start_degreetime_date: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  end_degreetime_date: string;

  @CreateDateColumn({ name: 'created_at' })
  create_data: Date;

  @ManyToOne(() => WorkersEntity, (workers) => workers.Degree_times, {
    nullable: true,
  })
  worker: WorkersEntity;
}
