import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { InfrastructureObject } from '../../common/infrastructure.object.type';
import { ProductAttributeName } from '../enum/product-attribute.name.enum';
import { ProductAttributeProvider } from '../enum/product-attribute.provider.enum';
import { ProductAttribute } from '../interface/product-attribute.interface';

export class ProductAttributeDto
  implements InfrastructureObject<ProductAttribute>
{
  @ApiProperty()
  id: string;

  @ApiProperty()
  productId: string;

  @ApiProperty({ enum: ProductAttributeName })
  attributeName: ProductAttributeName;

  @ApiProperty({ enum: ProductAttributeProvider })
  @Exclude()
  provider: ProductAttributeProvider;

  @ApiProperty()
  processedOutput: string;

  constructor(productAttribute: ProductAttribute) {
    Object.assign(this, productAttribute);
  }

  toDomain(): ProductAttribute {
    return {
      id: this.id,
      productId: this.productId,
      attributeName: this.attributeName,
      provider: this.provider,
      processedOutput: this.processedOutput,
    };
  }
}
