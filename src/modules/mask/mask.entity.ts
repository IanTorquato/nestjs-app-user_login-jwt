import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from 'src/modules/user/user.entity';

@Entity()
export class Mask {
  @PrimaryGeneratedColumn({ name: 'mask_id' })
  id: number;

  @Column({ nullable: false })
  color: string;

  @Column({ nullable: false, type: 'money' })
  cost: number;

  @Column({ nullable: false })
  size: string;

  @ManyToOne(() => User, (user) => user.mask, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  user: User;

  @CreateDateColumn({ nullable: false })
  created_at: Date;
}
