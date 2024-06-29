import { ApiProperty } from '@nestjs/swagger';
import { InfrastructureObject } from '../../common/infrastructure.object.type';
import { ProductCreate } from '../type/product.create.type';
import { ProductProviderName } from '../../product-provider/enum/product-provider.name.enum';

export class ProductCreateDto implements InfrastructureObject<ProductCreate> {
  @ApiProperty()
  providerExternalId: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  launchDate: Date;

  @ApiProperty()
  votes: number;

  @ApiProperty({ enum: ProductProviderName })
  provider: ProductProviderName;

  constructor(product: ProductCreate) {
    Object.assign(this, product);
  }

  toDomain(): ProductCreate {
    return {
      providerExternalId: this.providerExternalId,
      title: this.title,
      description: this.description,
      launchDate: this.launchDate,
      votes: this.votes,
      provider: this.provider,
    };
  }
}
