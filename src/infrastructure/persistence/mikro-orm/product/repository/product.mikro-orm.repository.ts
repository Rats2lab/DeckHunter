import { CreateRequestContext, MikroORM } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { v4 } from 'uuid';
import { Product } from '../../../../../domain/product/interface/product.interface';
import { ProductRepository } from '../../../../../domain/product/repository/product.repository';
import { ProductCreate } from '../../../../../domain/product/type/product.create.type';
import { ProductMikroOrm } from '../entity/product.mikro-orm.entity';

@Injectable()
export class ProductMikroOrmRepository implements ProductRepository {
  constructor(private readonly orm: MikroORM) {}

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

    await this.orm.em.persistAndFlush(productCreate);

    return productToCreate.toDomain();
  }
}
