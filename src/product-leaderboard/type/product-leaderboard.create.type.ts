import { ProductLeaderboard } from '../interface/product-leaderboard.interface';

export type ProductLeaderboardCreate = Omit<ProductLeaderboard, 'id'>;
