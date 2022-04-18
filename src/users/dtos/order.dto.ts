import { PartialType } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';

export class CreateOrderDto {
  @IsPositive()
  readonly customerId: number;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
