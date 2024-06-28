import { DateTime } from 'luxon';
import { ProductProviderName } from '../enum/product-provider.name.enum';

export interface ProductProviderFindProductFilters {
  provider: ProductProviderName;
  date: DateTime;
}
