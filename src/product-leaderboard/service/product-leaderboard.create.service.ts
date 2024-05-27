import { Injectable } from '@nestjs/common';
import { ProductLeaderboard } from '../interface/product-leaderboard.interface';
import { ProductLeaderboardCreate } from '../type/product-leaderboard.create.type';
import { ProductLeaderboardMikroOrmRepository } from '../repository/product-leaderboard.mikro-orm.repository';

@Injectable()
export class ProductLeaderboardCreateService {
  constructor(
    private readonly productLeaderboardRepository: ProductLeaderboardMikroOrmRepository,
  ) {}

  async create(
    productLeaderboardCreate: ProductLeaderboardCreate,
  ): Promise<ProductLeaderboard> {
    return this.productLeaderboardRepository.insert(productLeaderboardCreate);
  }
}
