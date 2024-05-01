import { CreateRequestContext, MikroORM } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { v4 } from 'uuid';
import { ProductLeaderboard } from '../interface/product-leaderboard.interface';
import { ProductLeaderboardRepository } from './product-leaderboard.repository';
import { ProductLeaderboardCreate } from '../type/product-leaderboard.create.type';
import { ProductLeaderboardMikroOrm } from '../entity/product-leaderboard.mikro-orm.entity';

@Injectable()
export class ProductLeaderboardMikroOrmRepository
  implements ProductLeaderboardRepository
{
  constructor(private readonly orm: MikroORM) {}

  @CreateRequestContext()
  async insertOne(
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
