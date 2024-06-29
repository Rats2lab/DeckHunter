import { UtilsMother } from '../../../../test/mother/utils.mother';
import { ProductProviderName } from '../../../product-provider/enum/product-provider.name.enum';
import { Product } from '../../interface/product.interface';

export class ProductMother {
  getRandomProduct(): Product {
    return {
      id: UtilsMother.getRandomUuid(),
      providerExternalId: UtilsMother.getRandomUuid(),
      title: UtilsMother.getRandomString(30),
      description: UtilsMother.getRandomString(150),
      launchDate: UtilsMother.getRandomDate(),
      votes: UtilsMother.getRandomNumber(),
      provider: UtilsMother.getRandomArrayElement(
        Object.values(ProductProviderName),
      ),
    };
  }
}
