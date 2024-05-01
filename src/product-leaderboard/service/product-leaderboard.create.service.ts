import { Injectable } from '@nestjs/common';
import { ProductLeaderboardRepository } from '../repository/product-leaderboard.repository';
import { ProductLeaderboard } from '../interface/product-leaderboard.interface';
import { ProductLeaderboardCreate } from '../type/product-leaderboard.create.type';

@Injectable()
export class ProductLeaderboardCreateService {
  constructor(
    private readonly productLeaderboardRepository: ProductLeaderboardRepository,
  ) {}

  async create(
    productLeaderboardCreate: ProductLeaderboardCreate,
  ): Promise<ProductLeaderboard> {
    return this.productLeaderboardRepository.insertOne(
      productLeaderboardCreate,
    );
  }
}
