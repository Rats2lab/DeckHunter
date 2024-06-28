import { Injectable } from '@nestjs/common';
import { ProductLeaderboard } from '../interface/product-leaderboard.interface';
import { ProductLeaderboardCreate } from '../type/product-leaderboard.create.type';
import { ProductLeaderboardCreateService } from './product-leaderboard.create.service';

@Injectable()
export class ProductLeaderboardCreateManyService {
  constructor(
    private readonly productCreateService: ProductLeaderboardCreateService,
  ) {}

  async createMany(
    productsCreate: ProductLeaderboardCreate[],
  ): Promise<ProductLeaderboard[]> {
    const createdProductLeaderboards: ProductLeaderboard[] = [];

    for (let productCreate of productsCreate) {
      const createdProductLeaderboard: ProductLeaderboard =
        await this.productCreateService.create(productCreate);

      createdProductLeaderboards.push(createdProductLeaderboard);
    }

    return createdProductLeaderboards;
  }
}
