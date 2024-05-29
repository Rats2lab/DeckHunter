import { Injectable } from '@nestjs/common';
import { ProductLeaderboardMikroOrmRepository } from '../repository/product-leaderboard.mikro-orm.repository';
import { ProductLeaderboard } from '../interface/product-leaderboard.interface';

@Injectable()
export class ProductLeaderboardFindAllService {
  constructor(
    private readonly productLeaderboardRepository: ProductLeaderboardMikroOrmRepository,
  ) {}

  async findAll(): Promise<ProductLeaderboard[]> {
    return this.productLeaderboardRepository.findAll();
  }
}
