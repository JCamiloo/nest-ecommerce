import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StandarEntity } from '../../common/entities/standar.entity';
import { Brand } from './brand.entity';

@Entity()
export class Product extends StandarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar' })
  image: string;

  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;
}
