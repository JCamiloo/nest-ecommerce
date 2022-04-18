import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { OrderItemService } from '../../services/order-item/order-item.service';
import { CreateOrderItemDto } from '../../dtos/order-item.dto';

@Controller('order-item')
export class OrderItemController {
  constructor(private orderItemService: OrderItemService) {}

  @Post()
  create(@Body() payload: CreateOrderItemDto) {
    return this.orderItemService.create(payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.orderItemService.remove(id);
  }
}
