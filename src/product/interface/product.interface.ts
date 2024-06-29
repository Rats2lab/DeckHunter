import { ProductProviderName } from '../../product-provider/enum/product-provider.name.enum';

export interface Product {
  id: string;
  providerExternalId: string;
  link: string;
  providerExternalLink: string;
  thumbnail: string;
  title: string;
  description: string;
  launchDate: Date;
  votes: number;
  provider: ProductProviderName;
}
