import { ProductProviderName } from '../../product-provider/enum/product-provider.name.enum';
import { ProductAuthor } from './product-author.interface';

export interface Product {
  id: string;
  providerExternalId: string;
  author: ProductAuthor;
  title: string;
  description: string;
  launchDate: Date;
  votes: number;
  country: string;
  provider: ProductProviderName;
}
