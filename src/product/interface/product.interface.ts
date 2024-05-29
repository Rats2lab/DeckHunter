import { Leaderboard } from '../../leaderboard/interface/leaderboard.interface';
import { ProductAuthor } from './product-author.interface';

export interface Product {
  id: string;
  author: ProductAuthor;
  title: string;
  description: string;
  launchDate: Date;
  votes: number;
  country: string;
}
