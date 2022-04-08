import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users/users.service';
import { CustomersService } from './services/customers/customers.service';
import { CustomersController } from './controllers/customers/customers.controller';
import { UsersController } from './controllers/users/users.controller';
import { ProductsModule } from '../products/products.module';
import { Customer } from './entities/customer.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([Customer])],
  providers: [UsersService, CustomersService],
  controllers: [CustomersController, UsersController],
})
export class UsersModule {}
