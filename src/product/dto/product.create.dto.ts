import { ApiProperty } from '@nestjs/swagger';
import { InfrastructureObject } from '../../common/infrastructure.object.type';
import { ProductAuthor } from '../interface/product-author.interface';
import { ProductCreate } from '../type/product.create.type';

export class ProductCreateDto implements InfrastructureObject<ProductCreate> {
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

  constructor(product: ProductCreate) {
    Object.assign(this, product);
  }

  toDomain(): ProductCreate {
    return {
      author: this.author,
      title: this.title,
      description: this.description,
      launchDate: this.launchDate,
      votes: this.votes,
      country: this.country,
    };
  }
}
