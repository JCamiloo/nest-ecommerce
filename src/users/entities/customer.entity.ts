import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { StandarEntity } from '../../common/entities/standar.entity';

@Entity()
export class Customer extends StandarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'varchar', length: 255 })
  phone: string;
}
