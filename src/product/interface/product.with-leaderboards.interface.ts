import { Leaderboard } from '../../leaderboard/interface/leaderboard.interface';
import { Product } from './product.interface';

export interface ProductWithLeaderboards extends Product {
  leaderboards: Leaderboard[];
}
