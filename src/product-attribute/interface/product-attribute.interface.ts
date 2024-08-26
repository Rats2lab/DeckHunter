import { ProductAttributeName } from '../enum/product-attribute.name.enum';
import { ProductAttributeProvider } from '../enum/product-attribute.provider.enum';

export interface ProductAttribute {
  id: string;
  productId: string;
  attributeName: ProductAttributeName;
  provider: ProductAttributeProvider;
  rawOutput: string;
  processedOutput: string;
}
