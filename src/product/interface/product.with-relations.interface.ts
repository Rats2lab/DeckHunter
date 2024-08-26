import { Leaderboard } from '../../leaderboard/interface/leaderboard.interface';
import { ProductAttribute } from '../../product-attribute/interface/product-attribute.interface';
import { Product } from './product.interface';

export interface ProductWithRelations extends Product {
  leaderboards: Leaderboard[];
  attributes: ProductAttribute[];
}
