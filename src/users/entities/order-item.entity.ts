import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StandarEntity } from '../../common/entities/standar.entity';
import { Product } from '../../products/entities/product.entity';
import { Order } from './order.entity';

@Entity()
export class OrderItem extends StandarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;
}
