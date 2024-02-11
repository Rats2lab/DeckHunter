import { IsNotEmpty, IsUUID } from 'class-validator';
import { InfrastructureObject } from '../../../../../domain/common/infrastructure-object.type';
import { ProductFindOneFilters } from '../../../../../domain/product/type/product.find-one-filters.type';

export class ProductFindOneFiltersDto
  implements InfrastructureObject<ProductFindOneFilters>
{
  @IsUUID()
  @IsNotEmpty()
  id: string;

  toDomain(): ProductFindOneFilters {
    return {
      id: this.id,
    };
  }
}
