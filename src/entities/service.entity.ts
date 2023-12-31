import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GroupsEntity } from './group.entity';

@Entity()
export class ServicesEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
  })
  service_id: string;

  @OneToMany(() => GroupsEntity, (group) => group.servic)
  groups: GroupsEntity[];

  @CreateDateColumn({ name: 'created_at' })
  create_data: Date;
}
