import { DateTime } from 'luxon';
import { ProductProviderName } from '../enum/product-provider.name.enum';

export interface ProductProviderGetLeaderboardLinkParams {
  provider: ProductProviderName;
  date: DateTime;
}
