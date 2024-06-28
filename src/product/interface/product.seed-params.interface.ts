import { ProductProviderName } from '../../product-provider/enum/product-provider.name.enum';

export interface ProductSeedParams {
  provider: ProductProviderName;
  leaderboardDate: Date;
}
