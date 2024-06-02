import { ApiProperty } from '@nestjs/swagger';
import { InfrastructureObject } from '../../common/infrastructure.object.type';
import { ProductUpdateFields } from '../type/product.update-fields.type';

export class ProductUpdateFieldsDto
  implements InfrastructureObject<ProductUpdateFields>
{
  @ApiProperty()
  votes: number;

  constructor(product: ProductUpdateFields) {
    Object.assign(this, product);
  }

  toDomain(): ProductUpdateFields {
    return {
      votes: this.votes,
    };
  }
}
