import { ApiProperty } from '@nestjs/swagger';
import { InfrastructureObject } from '../../common/infrastructure-object.type';
import { ProductRaw } from '../interface/product.raw.interface';

export class ProductRawDto implements InfrastructureObject<ProductRaw> {
  @ApiProperty()
  data: any;

  constructor(product: ProductRaw) {
    Object.assign(this, product);
  }

  toDomain(): ProductRaw {
    return {
      data: this.data,
    };
  }
}
