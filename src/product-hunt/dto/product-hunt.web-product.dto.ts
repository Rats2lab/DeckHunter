import { ApiProperty } from '@nestjs/swagger';
import { InfrastructureObject } from '../../common/infrastructure.object.type';
import { ProductHuntWebProduct } from '../interface/product-hunt.web-product.interface';

export class ProductHuntWebProductDto
  implements InfrastructureObject<ProductHuntWebProduct>
{
  @ApiProperty()
  data: any;

  constructor(product: ProductHuntWebProduct) {
    Object.assign(this, product);
  }

  toDomain(): ProductHuntWebProduct {
    return {
      data: this.data,
    };
  }
}
