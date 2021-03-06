import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { StandarEntity } from '../../common/entities/standar.entity';
import { User } from './user.entity';
import { Order } from './order.entity';

@Entity({ name: 'customers' })
export class Customer extends StandarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, name: 'last_name' })
  lastName: string;

  @Column({ type: 'varchar', length: 255 })
  phone: string;

  @OneToOne(() => User, (user) => user.customer, { nullable: true })
  user: User;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
