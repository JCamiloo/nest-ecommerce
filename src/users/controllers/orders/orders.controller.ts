import {
  Body,
  Controller,
  Post,
  Put,
  Param,
  ParseIntPipe,
  Get,
  Delete,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Roles } from '../../../auth/decorators/roles.decorators';
import { Role } from '../../../auth/models/roles.model';
import { CreateOrderDto, UpdateOrderDto } from '../../dtos/order.dto';
import { OrdersService } from '../../services/orders/orders.service';
import { PayloadToken } from '../../../auth/models/token.model';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.ordersService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.remove(id);
  }
}
