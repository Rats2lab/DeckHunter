import { ProductAuthor } from '../interface/product-author.interface';
import { InfrastructureObject } from '../../common/infrastructure-object.type';
import { Product } from '../interface/product.interface';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto implements InfrastructureObject<Product> {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: ProductAuthor })
  author: ProductAuthor;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  launchDate: Date;

  @ApiProperty()
  votes: number;

  @ApiProperty()
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
