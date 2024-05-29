import {
  CreateRequestContext,
  EntityComparator,
  MikroORM,
} from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { v4 } from 'uuid';
import { ProductMikroOrm } from '../entity/product.mikro-orm.entity';
import { ProductWithLeaderboards } from '../interface/product.with-leaderboards.interface';
import { ProductCreate } from '../type/product.create.type';
import { ProductFindOneFilters } from '../type/product.find-one-filters.type';
import { ProductUpdateFields } from '../type/product.update-fields.type';
import { ProductUpdateFilters } from '../type/product.update-filters.type';
import { Product } from '../interface/product.interface';

@Injectable()
export class ProductMikroOrmRepository {
  constructor(private readonly orm: MikroORM) {}

  @CreateRequestContext()
  async findOne(
    productFindOneFilters: ProductFindOneFilters,
  ): Promise<ProductWithLeaderboards | undefined> {
    const foundProduct: ProductMikroOrm | null = await this.orm.em.findOne(
      ProductMikroOrm,
      productFindOneFilters,
      { populate: ['leaderboards'] },
    );

    return foundProduct ? foundProduct.toDomain() : undefined;
  }
  @CreateRequestContext()
  async findAll(): Promise<ProductWithLeaderboards[]> {
    const foundProducts: ProductMikroOrm[] = await this.orm.em.find(
      ProductMikroOrm,
      {},
      { populate: ['leaderboards'] },
    );

    return foundProducts.map((product) => product.toDomain());
  }

  @CreateRequestContext()
  async insert(productCreate: ProductCreate): Promise<Product> {
    const productToCreate: ProductMikroOrm = this.orm.em.create(
      ProductMikroOrm,
      {
        id: v4(),
        ...productCreate,
        createdAt: DateTime.now().toJSDate(),
        updatedAt: DateTime.now().toJSDate(),
      },
    );

    await this.orm.em.persistAndFlush(productToCreate);

    return productToCreate.toDomain();
  }

  @CreateRequestContext()
  async update(
    productUpdateFilters: ProductUpdateFilters,
    productUpdateFields: ProductUpdateFields,
  ): Promise<Product | undefined> {
    const existingProduct: ProductMikroOrm | null = await this.orm.em.findOne(
      ProductMikroOrm,
      productUpdateFilters,
    );

    if (!existingProduct) {
      return;
    }

    const entityComparator: EntityComparator = this.orm.em.getComparator();

    const entityWithoutChanges: boolean = entityComparator.matching(
      ProductMikroOrm.name,
      existingProduct,
      { ...existingProduct, ...productUpdateFields },
    );

    if (entityWithoutChanges) {
      return existingProduct.toDomain();
    }

    this.orm.em.assign(existingProduct, productUpdateFields);

    this.orm.em.flush();

    return existingProduct.toDomain();
  }
}
