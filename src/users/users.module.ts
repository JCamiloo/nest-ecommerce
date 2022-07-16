import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users/users.service';
import { CustomersService } from './services/customers/customers.service';
import { CustomersController } from './controllers/customers/customers.controller';
import { UsersController } from './controllers/users/users.controller';
import { ProductsModule } from '../products/products.module';
import { Customer } from './entities/customer.entity';
import { User } from './entities/user.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrdersService } from './services/orders/orders.service';
import { OrdersController } from './controllers/orders/orders.controller';
import { OrderItemController } from './controllers/order-item/order-item.controller';
import { OrderItemService } from './services/order-item/order-item.service';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([Customer, User, Order, OrderItem]),
  ],
  providers: [UsersService, CustomersService, OrdersService, OrderItemService],
  controllers: [
    CustomersController,
    UsersController,
    OrdersController,
    OrderItemController,
  ],
  exports: [UsersService],
})
export class UsersModule {}
