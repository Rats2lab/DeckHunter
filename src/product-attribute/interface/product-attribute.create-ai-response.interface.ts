import { ProductAttributeName } from '../enum/product-attribute.name.enum';

export interface ProductAttributeCreateAiResponse {
  productId: string;
  attributeName: ProductAttributeName;
  output: string;
}
