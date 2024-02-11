import { Author } from '../../../../../domain/author/interface/author.interface';
import { InfrastructureObject } from '../../../../../domain/common/infrastructure-object.type';
import { Product } from '../../../../../domain/product/interface/product.interface';

export class ProductDto implements InfrastructureObject<Product> {
  id: string;
  author: Author;
  title: string;
  description: string;
  launchDate: Date;
  votes: number;
  country: string;

  constructor(product: Product) {
    Object.assign(this, product);
  }

  toDomain(): Product {
    return {
      id: this.id,
      author: this.author,
      title: this.title,
      description: this.description,
      launchDate: this.launchDate,
      votes: this.votes,
      country: this.country,
    };
  }
}
