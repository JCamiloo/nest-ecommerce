import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Get,
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

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id, true);
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

  @Put(':productId/category/:categoryId')
  addProductCategory(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.addProductCategory(productId, categoryId);
  }

  @Delete(':productId/category/:categoryId')
  deleteProductCategory(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.removeProductCategory(productId, categoryId);
  }
}
