import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from '../../services/products/products.service';
import { CreateProductDto, UpdateProductDto } from '../../dtos/product.dto';
import { GenericController } from '../../../common/controllers/generic.controller';
import { Product } from '../../entities/product.entity';

@ApiTags('products')
@Controller('products')
export class ProductsController extends GenericController<Product> {
  constructor(private productsService: ProductsService) {
    super(productsService);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }
}
