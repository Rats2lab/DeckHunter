import { CreateRequestContext, MikroORM } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { v4 } from 'uuid';
import { Product } from '../../../../../domain/product/interface/product.interface';
import { ProductRepository } from '../../../../../domain/product/repository/product.repository';
import { ProductCreate } from '../../../../../domain/product/type/product.create.type';
import { ProductMikroOrm } from '../entity/product.mikro-orm.entity';
import { ProductFindOneFilters } from '../../../../../domain/product/type/product.find-one-filters.type';

@Injectable()
export class ProductMikroOrmRepository implements ProductRepository {
  constructor(private readonly orm: MikroORM) {}
  async findOne(
    productFindOneFilters: ProductFindOneFilters,
  ): Promise<Product> {
    const foundProduct: ProductMikroOrm = await this.orm.em.findOneOrFail(
      ProductMikroOrm,
      productFindOneFilters,
    );

    return foundProduct.toDomain();
  }
  async findAll(): Promise<Product[]> {
    const foundProducts: ProductMikroOrm[] = await this.orm.em.find(
      ProductMikroOrm,
      {},
    );

    return foundProducts.map((product) => product.toDomain());
  }

  @CreateRequestContext()
  async insertOne(productCreate: ProductCreate): Promise<Product> {
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
}
