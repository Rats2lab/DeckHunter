import { ProductAttributeName } from '../enum/product-attribute.name.enum';

export interface ProductAttributeCreateAiResponse {
  attribute: ProductAttributeName;
  output: string;
}
