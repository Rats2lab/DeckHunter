import { ApiProperty } from '@nestjs/swagger';
import { DateTime } from 'luxon';
import { InfrastructureObject } from '../../common/infrastructure.object.type';
import { ProductProviderName } from '../../product-provider/enum/product-provider.name.enum';
import { ProductSeedParams } from '../interface/product.seed-params.interface';
import { ProductCreate } from '../type/product.create.type';
import { Type } from 'class-transformer';

export class ProductSeedDto implements InfrastructureObject<ProductSeedParams> {
  @ApiProperty({ enum: ProductProviderName })
  provider: ProductProviderName;

  @ApiProperty()
  @Type(() => Date)
  leaderboardDate: Date;

  constructor(product: ProductCreate) {
    Object.assign(this, product);
  }

  toDomain(): ProductSeedParams {
    return {
      provider: this.provider,
      leaderboardDate: this.leaderboardDate,
    };
  }
}
