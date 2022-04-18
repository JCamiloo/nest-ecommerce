import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from '../../entities/order-item.entity';
import { CreateOrderItemDto } from '../../dtos/order-item.dto';
import { OrdersService } from '../orders/orders.service';
import { ProductsService } from '../../../products/services/products/products.service';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem) private repository: Repository<OrderItem>,
    private ordersService: OrdersService,
    private productsService: ProductsService,
  ) {}

  async create(data: CreateOrderItemDto) {
    const order = await this.ordersService.findOne(data.orderId);
    const product = await this.productsService.findOne(data.productId);

    const orderItem = new OrderItem();
    orderItem.order = order;
    orderItem.product = product;
    orderItem.quantity = data.quantity;

    return this.repository.save(orderItem);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
