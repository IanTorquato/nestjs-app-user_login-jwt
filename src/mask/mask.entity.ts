import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from 'src/user/user.entity';

@Entity()
export class Mask {
  @PrimaryGeneratedColumn({ name: 'mask_id' })
  id: number;

  @Column({ nullable: false })
  color: string;

  @Column({ nullable: false })
  cost: number;

  @Column({ nullable: false })
  size: string;

  @ManyToOne(() => User, (user) => user.mask, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  user: [name: string];

  @CreateDateColumn({ nullable: false })
  created_at: Date;
}
