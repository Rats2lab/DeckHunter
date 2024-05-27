import { Injectable } from '@nestjs/common';
import { Product } from '../interface/product.interface';
import { ProductFindOneFilters } from '../type/product.find-one-filters.type';
import { ProductMikroOrmRepository } from '../repository/product.mikro-orm.repository';

@Injectable()
export class ProductFindOneService {
  constructor(private readonly productRepository: ProductMikroOrmRepository) {}

  async findOne(
    productFindOneFilters: ProductFindOneFilters,
  ): Promise<Product> {
    return this.productRepository.findOne(productFindOneFilters);
  }
}
