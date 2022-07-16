import { Exclude } from 'class-transformer';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { StandarEntity } from '../../common/entities/standar.entity';
import { Customer } from './customer.entity';

@Entity({ name: 'users' })
export class User extends StandarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  email: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  role: string;

  @OneToOne(() => Customer, (customer) => customer.user, { nullable: true })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}
