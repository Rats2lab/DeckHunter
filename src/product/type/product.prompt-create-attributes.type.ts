import { Product } from '../interface/product.interface';

export type ProductPromptCreateAttributes = Pick<
  Product,
  'id' | 'tagline' | 'description'
>;
