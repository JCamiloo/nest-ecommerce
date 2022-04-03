import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { CustomersService } from './services/customers/customers.service';
import { CustomersController } from './controllers/customers/customers.controller';
import { UsersController } from './controllers/users/users.controller';

@Module({
  providers: [UsersService, CustomersService],
  controllers: [CustomersController, UsersController]
})
export class UsersModule {}
