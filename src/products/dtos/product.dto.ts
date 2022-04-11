import { PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

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

  @IsPositive()
  @IsNotEmpty()
  readonly brandId: number;

  @IsArray()
  @IsNotEmpty()
  readonly categoriesId: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
