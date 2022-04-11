import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { GenericService } from '../../../common/services/generic.service';
import { CreateProductDto, UpdateProductDto } from '../../dtos/product.dto';
import { Category } from '../../entities/category.entity';
import { Brand } from '../../entities/brand.entity';

@Injectable()
export class ProductsService extends GenericService<Product> {
  constructor(
    @InjectRepository(Product) private repository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
  ) {
    super(repository);
  }

  findAll() {
    return this.repository.find({ relations: ['brand'] });
  }

  async findOne(id: number) {
    const item = await this.repository.findOne(id, {
      relations: ['brand', 'categories'],
    });

    if (!item) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    return item;
  }

  async create(data: CreateProductDto) {
    const product = await this.repository.find({ where: { name: data.name } });

    if (product.length > 0) {
      throw new BadRequestException('Product name already exists');
    }

    const newProduct = this.repository.create(data);

    const brand = await this.brandRepository.findOne(data.brandId);
    newProduct.brand = brand;

    const categories = await this.categoryRepository.findByIds(
      data.categoriesId,
    );

    newProduct.categories = categories;

    return this.repository.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.repository.findOne(id);

    if (changes.brandId) {
      const brand = await this.brandRepository.findOne(changes.brandId);
      product.brand = brand;
    }

    this.repository.merge(product, changes);

    return this.repository.save(product);
  }
}
