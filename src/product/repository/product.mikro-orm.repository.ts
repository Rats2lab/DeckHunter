import {
  CreateRequestContext,
  EntityComparator,
  MikroORM,
} from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { v4 } from 'uuid';
import { ProductMikroOrm } from '../entity/product.mikro-orm.entity';
import { ProductWithRelations } from '../interface/product.with-relations.interface';
import { ProductCreate } from '../type/product.create.type';
import { ProductFindOneFilters } from '../type/product.find-one-filters.type';
import { ProductUpdateFields } from '../type/product.update-fields.type';
import { ProductUpdateFilters } from '../type/product.update-filters.type';
import { Product } from '../interface/product.interface';
import { ProductFindFilters } from '../type/product.find-filters.type';

@Injectable()
export class ProductMikroOrmRepository {
  constructor(private readonly orm: MikroORM) {}

  @CreateRequestContext()
  async findOne(
    productFindOneFilters: ProductFindOneFilters,
  ): Promise<ProductWithRelations | undefined> {
    const foundProduct: ProductMikroOrm | null = await this.orm.em.findOne(
      ProductMikroOrm,
      productFindOneFilters,
      { populate: ['leaderboards', 'attributes'] },
    );

    return foundProduct ? foundProduct.toDomain() : undefined;
  }
  @CreateRequestContext()
  async findAll(
    productFindFilters: ProductFindFilters,
  ): Promise<ProductWithRelations[]> {
    const foundProducts: ProductMikroOrm[] = await this.orm.em.find(
      ProductMikroOrm,
      {
        leaderboards: { $eq: productFindFilters.leaderboardId },
      },
      {
        populate: ['leaderboards', 'attributes'],
        offset: productFindFilters.offset,
        limit: productFindFilters.limit,
      },
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
