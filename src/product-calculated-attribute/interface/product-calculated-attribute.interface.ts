import { ProductCalculatedAttributeProvider } from '../enum/product-calculated-attribute.provider.enum';

export interface ProductCalculatedAttribute {
  id: string;
  productId: string;
  calculatedAttributeId: string;
  provider: ProductCalculatedAttributeProvider;
  rawOutput: string;
  processedOutput: string;
}
