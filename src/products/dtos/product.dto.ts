import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString, IsUrl } from 'class-validator';

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
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
