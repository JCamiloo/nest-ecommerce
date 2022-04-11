import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { GenericService } from '../../../common/services/generic.service';
import { CreateProductDto, UpdateProductDto } from '../../dtos/product.dto';
import { BrandsService } from '../brands/brands.service';

@Injectable()
export class ProductsService extends GenericService<Product> {
  constructor(
    @InjectRepository(Product) private repository: Repository<Product>,
    private brandsService: BrandsService,
  ) {
    super(repository);
  }

  findAll() {
    return this.repository.find({ relations: ['brand'] });
  }

  async create(data: CreateProductDto) {
    const product = await this.repository.find({ where: { name: data.name } });
    console.log(product);

    if (product.length > 0) {
      throw new BadRequestException('Product name already exists');
    }

    const newProduct = this.repository.create(data);
    const brand = await this.brandsService.findOne(data.brandId);
    newProduct.brand = brand;

    return this.repository.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.repository.findOne(id);

    if (changes.brandId) {
      const brand = await this.brandsService.findOne(changes.brandId);
      product.brand = brand;
    }

    this.repository.merge(product, changes);

    return this.repository.save(product);
  }
}
