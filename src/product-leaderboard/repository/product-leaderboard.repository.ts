import { ProductLeaderboard } from '../interface/product-leaderboard.interface';
import { ProductLeaderboardCreate } from '../type/product-leaderboard.create.type';

export abstract class ProductLeaderboardRepository {
  abstract insertOne(
    productLeaderboardCreate: ProductLeaderboardCreate,
  ): Promise<ProductLeaderboard>;
}
