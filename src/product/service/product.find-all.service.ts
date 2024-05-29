import { Injectable } from '@nestjs/common';
import { ProductWithLeaderboards } from '../interface/product.with-leaderboards.interface';
import { ProductMikroOrmRepository } from '../repository/product.mikro-orm.repository';
import { ProductFindFilters } from '../type/product.find-filters.type';

@Injectable()
export class ProductFindAllService {
  constructor(private readonly productRepository: ProductMikroOrmRepository) {}

  async findAll(
    productFindFilters: ProductFindFilters,
  ): Promise<ProductWithLeaderboards[]> {
    return this.productRepository.findAll(productFindFilters);
  }
}
