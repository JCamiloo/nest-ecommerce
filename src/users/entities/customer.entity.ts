import { PrimaryGeneratedColumn, Column, Entity, OneToOne } from 'typeorm';
import { StandarEntity } from '../../common/entities/standar.entity';
import { User } from './user.entity';

@Entity()
export class Customer extends StandarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  last_name: string;

  @Column({ type: 'varchar', length: 255 })
  phone: string;

  @OneToOne(() => User, (user) => user.customer, { nullable: true })
  user: User;
}
