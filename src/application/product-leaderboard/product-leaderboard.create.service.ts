import { Injectable } from '@nestjs/common';
import { ProductLeaderboardRepository } from '../../domain/product-leaderboard/repository/product-leaderboard.repository';
import { ProductLeaderboard } from '../../domain/product-leaderboard/interface/product-leaderboard.interface';
import { ProductLeaderboardCreate } from '../../domain/product-leaderboard/type/product-leaderboard.create.type';

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
