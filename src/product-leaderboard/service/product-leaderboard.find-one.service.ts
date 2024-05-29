import { Injectable } from '@nestjs/common';
import { ProductLeaderboard } from '../interface/product-leaderboard.interface';
import { ProductLeaderboardMikroOrmRepository } from '../repository/product-leaderboard.mikro-orm.repository';
import { ProductLeaderboardFindOneFilters } from '../type/product-leaderboard.find-one-filters.type';

@Injectable()
export class ProductLeaderboardFindOneService {
  constructor(
    private readonly productLeaderboardRepository: ProductLeaderboardMikroOrmRepository,
  ) {}

  async findOne(
    productFindOneFilters: ProductLeaderboardFindOneFilters,
  ): Promise<ProductLeaderboard> {
    return this.productLeaderboardRepository.findOne(productFindOneFilters);
  }
}
