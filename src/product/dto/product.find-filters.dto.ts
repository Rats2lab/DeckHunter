import { IsDate } from 'class-validator';
import { InfrastructureObject } from '../../common/infrastructure-object.type';
import { ProductFindFilters } from '../type/product.find-filters.type';

export class ProductFindFiltersDto
  implements InfrastructureObject<ProductFindFilters>
{
  @IsDate()
  dateFrom?: Date;

  @IsDate()
  dateTo?: Date;

  toDomain(): ProductFindFilters {
    return {
      dateFrom: this.dateFrom,
      dateTo: this.dateTo,
    };
  }
}
