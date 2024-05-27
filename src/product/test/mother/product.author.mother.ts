import { UtilsMother } from '../../../../test/mother/utils.mother';
import { ProductAuthor } from '../../interface/product-author.interface';

export class ProductAuthorMother {
  getRandomProductAuthor(): ProductAuthor {
    return {
      id: UtilsMother.getRandomUuid(),
      nickname: UtilsMother.getRandomString(30),
      link: UtilsMother.getRandomString(300),
    };
  }
}
