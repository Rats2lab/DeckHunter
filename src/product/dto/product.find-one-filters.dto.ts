import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { InfrastructureObject } from '../../common/infrastructure-object.type';
import { ProductFindOneFilters } from '../type/product.find-one-filters.type';

export class ProductFindOneFiltersDto
  implements InfrastructureObject<ProductFindOneFilters>
{
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  language: string;

  toDomain(): ProductFindOneFilters {
    return {
      id: this.id,
      language: this.language,
    };
  }
}
