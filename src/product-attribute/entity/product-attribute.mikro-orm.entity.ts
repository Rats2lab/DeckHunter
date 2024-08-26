import {
  DateTimeType,
  Entity,
  Enum,
  ManyToOne,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { ProductMikroOrm } from '../../product/entity/product.mikro-orm.entity';
import { ProductAttributeProvider } from '../enum/product-attribute.provider.enum';
import { ProductAttribute } from '../interface/product-attribute.interface';
import { ProductAttributeName } from '../enum/product-attribute.name.enum';

@Unique({ properties: ['productId', 'attributeName', 'provider'] })
@Entity({ tableName: 'product_attribute' })
export class ProductAttributeMikroOrm implements ProductAttribute {
  @PrimaryKey({
    columnType: 'uuid',
  })
  id: string;

  @ManyToOne(() => ProductMikroOrm, {
    onDelete: 'RESTRICT',
    onUpdateIntegrity: 'RESTRICT',
    nullable: false,
    joinColumn: 'product_id',
    mapToPk: true,
    cascade: [],
  })
  productId: string;

  @Enum({ items: () => ProductAttributeName })
  attributeName: ProductAttributeName;

  @Enum({ items: () => ProductAttributeProvider })
  provider: ProductAttributeProvider;

  @Property({
    length: 1500,
  })
  rawOutput: string;

  @Property({
    length: 500,
  })
  processedOutput: string;

  @Property({
    type: DateTimeType,
    columnType: 'timestamp',
  })
  createdAt: Date;

  @Property({
    type: DateTimeType,
    columnType: 'timestamp',
  })
  updatedAt: Date;

  @Property({ persist: false, hidden: true })
  toDomain(): ProductAttribute {
    return {
      id: this.id,
      productId: this.productId,
      attributeName: this.attributeName,
      provider: this.provider,
      rawOutput: this.rawOutput,
      processedOutput: this.processedOutput,
    };
  }
}
