import { ProductTransformableObject } from '../../product/interface/product.transformable-object.type';

export interface ProductHuntProduct extends ProductTransformableObject {
  id: string;
  name: string;
  tagline: string;
  description: string;
  website: string;
  thumbnail: { url: string };
  url: string;
  userId: string;
  votesCount: number;
  reviewsCount: number;
  reviewsRating: number;
  featuredAt: string;
  createdAt: string;
}
