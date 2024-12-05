import { CreateRequestContext, MikroORM } from '@mikro-orm/core';
import { InjectMikroORM } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { v4 } from 'uuid';
import { DATABASE_CONTEXT_NAME } from '../../database/constant/database.constant';
import { ProductAttributeMikroOrm } from '../entity/product-attribute.mikro-orm.entity';
import { ProductAttribute } from '../interface/product-attribute.interface';
import { ProductAttributeCountFilter } from '../type/product-attribute.count-filter.type';
import { ProductAttributeCreate } from '../type/product-attribute.create.type';

@Injectable()
export class ProductAttributeMikroOrmRepository {
  constructor(
    @InjectMikroORM(DATABASE_CONTEXT_NAME) private readonly orm: MikroORM,
  ) {}

  @CreateRequestContext()
  async insert(
    productAttributeCreate: ProductAttributeCreate,
  ): Promise<ProductAttribute> {
    const productAttributeToCreate: ProductAttributeMikroOrm =
      this.orm.em.create(ProductAttributeMikroOrm, {
        id: v4(),
        ...productAttributeCreate,
        createdAt: DateTime.now().toJSDate(),
        updatedAt: DateTime.now().toJSDate(),
      });

    await this.orm.em.persistAndFlush(productAttributeToCreate);

    return productAttributeToCreate.toDomain();
  }

  @CreateRequestContext()
  async count(
    productAttributeCountFilter: ProductAttributeCountFilter,
  ): Promise<number> {
    return this.orm.em.count(
      ProductAttributeMikroOrm,
      productAttributeCountFilter,
    );
  }
}
