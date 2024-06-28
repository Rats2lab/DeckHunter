import { DateTime } from 'luxon';
import { ProductHuntProductOrder } from '../enum/product-hunt.product-order.enum';

export interface ProductHuntFindProductsFilters {
  dateFrom: DateTime;
  dateTo: DateTime;
  featured: boolean;
  order: ProductHuntProductOrder;
}
