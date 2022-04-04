import { PartialType } from '@nestjs/swagger';
import { IsPositive, IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsPositive()
  readonly price: number;

  @IsPositive()
  readonly stock: number;

  @IsUrl()
  readonly image: string;
}

export class UpdateProductDro extends PartialType(CreateProductDto) { }
