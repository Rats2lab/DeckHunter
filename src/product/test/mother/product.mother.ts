import { UtilsMother } from '../../../../test/mother/utils.mother';
import { ProductProviderName } from '../../../product-provider/enum/product-provider.name.enum';
import { Product } from '../../interface/product.interface';
import { ProductAuthorMother } from './product.author.mother';

export class ProductMother {
  getRandomProduct(): Product {
    return {
      id: UtilsMother.getRandomUuid(),
      author: new ProductAuthorMother().getRandomProductAuthor(),
      title: UtilsMother.getRandomString(30),
      description: UtilsMother.getRandomString(150),
      launchDate: UtilsMother.getRandomDate(),
      votes: UtilsMother.getRandomNumber(),
      country: UtilsMother.getRandomString(25),
      provider: UtilsMother.getRandomArrayElement(
        Object.values(ProductProviderName),
      ),
    };
  }
}
