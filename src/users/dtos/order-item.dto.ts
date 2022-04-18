import { PartialType } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';

export class CreateOrderItemDto {
  @IsPositive()
  readonly orderId: number;

  @IsPositive()
  readonly productId: number;

  @IsPositive()
  readonly quantity: number;
}

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}
