import { Leaderboard } from '../../leaderboard/interface/leaderboard.interface';
import { ProductAuthor } from './product-author.interface';

export interface ProductWithLeaderboards {
  id: string;
  author: ProductAuthor;
  title: string;
  description: string;
  launchDate: Date;
  votes: number;
  country: string;
  leaderboards: Leaderboard[];
}
