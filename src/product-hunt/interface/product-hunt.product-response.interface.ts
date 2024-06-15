import { ProductHuntProduct } from './product-hunt.product.interface';

export interface ProductHuntProductResponse {
  data: {
    posts: {
      edges: [
        {
          node: ProductHuntProduct;
        },
      ];
    };
  };
}
