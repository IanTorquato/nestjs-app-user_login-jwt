import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Mask } from 'src/modules/mask/mask.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Mask, (mask) => mask.user, { nullable: true })
  mask: Mask[];

  @CreateDateColumn({ nullable: false })
  created_at: Date;
}
