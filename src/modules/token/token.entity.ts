import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../user/user.entity';

@Entity()
export class Token {
  @PrimaryGeneratedColumn({ name: 'token_id' })
  id: number;

  @Column({ nullable: false })
  hash: string;

  @OneToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ referencedColumnName: 'id' })
  user: User;

  @CreateDateColumn({ nullable: false })
  created_at: Date;
}
