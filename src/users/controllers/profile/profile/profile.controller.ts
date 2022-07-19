import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { OrdersService } from '../../../services/orders/orders.service';
import { JwtGuard } from '../../../../auth/guards/jwt/jwt.guard';
import { RolesGuard } from '../../../../auth/guards/roles/roles.guard';
import { Roles } from '../../../../auth/decorators/roles.decorators';
import { Role } from '../../../../auth/models/roles.model';
import { PayloadToken } from '../../../../auth/models/token.model';

@UseGuards(JwtGuard, RolesGuard)
@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private ordersService: OrdersService) {}

  @Roles(Role.CUSTOMER)
  @Get('my-orders')
  getOrders(@Req() request: Request) {
    const user = request.user as PayloadToken;
    return this.ordersService.ordersByCustomer(user.sub);
  }
}
