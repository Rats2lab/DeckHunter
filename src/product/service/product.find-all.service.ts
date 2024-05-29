import { Injectable } from '@nestjs/common';
import { ProductWithLeaderboards } from '../interface/product.with-leaderboards.interface';
import { ProductMikroOrmRepository } from '../repository/product.mikro-orm.repository';

@Injectable()
export class ProductFindAllService {
  constructor(private readonly productRepository: ProductMikroOrmRepository) {}

  async findAll(): Promise<ProductWithLeaderboards[]> {
    return this.productRepository.findAll();
  }
}
