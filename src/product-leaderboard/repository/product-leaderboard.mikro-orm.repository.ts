import { CreateRequestContext, MikroORM } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { v4 } from 'uuid';
import { ProductLeaderboardMikroOrm } from '../entity/product-leaderboard.mikro-orm.entity';
import { ProductLeaderboard } from '../interface/product-leaderboard.interface';
import { ProductLeaderboardCreate } from '../type/product-leaderboard.create.type';

@Injectable()
export class ProductLeaderboardMikroOrmRepository {
  constructor(private readonly orm: MikroORM) {}

  @CreateRequestContext()
  async insert(
    productLeaderboardCreate: ProductLeaderboardCreate,
  ): Promise<ProductLeaderboard> {
    const productLeaderboardToCreate: ProductLeaderboardMikroOrm =
      this.orm.em.create(ProductLeaderboardMikroOrm, {
        id: v4(),
        ...productLeaderboardCreate,
        createdAt: DateTime.now().toJSDate(),
        updatedAt: DateTime.now().toJSDate(),
      });

    await this.orm.em.persistAndFlush(productLeaderboardCreate);

    return productLeaderboardToCreate.toDomain();
  }
}
