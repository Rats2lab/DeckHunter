import { Injectable } from '@nestjs/common';
import { ProductWithLeaderboards } from '../interface/product.with-leaderboards.interface';
import { ProductMikroOrmRepository } from '../repository/product.mikro-orm.repository';
import { ProductFindOneFilters } from '../type/product.find-one-filters.type';

@Injectable()
export class ProductFindOneService {
  constructor(private readonly productRepository: ProductMikroOrmRepository) {}

  async findOne(
    productFindOneFilters: ProductFindOneFilters,
  ): Promise<ProductWithLeaderboards> {
    return this.productRepository.findOne(productFindOneFilters);
  }
}
