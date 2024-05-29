import {
  CreateRequestContext,
  EntityComparator,
  MikroORM,
} from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { v4 } from 'uuid';
import { ProductLeaderboardMikroOrm } from '../entity/product-leaderboard.mikro-orm.entity';
import { ProductLeaderboard } from '../interface/product-leaderboard.interface';
import { ProductLeaderboardCreate } from '../type/product-leaderboard.create.type';
import { ProductLeaderboardFindOneFilters } from '../type/product-leaderboard.find-one-filters.type';

@Injectable()
export class ProductLeaderboardMikroOrmRepository {
  constructor(private readonly orm: MikroORM) {}

  @CreateRequestContext()
  async findOne(
    productLeaderboardFindOneFilters: ProductLeaderboardFindOneFilters,
  ): Promise<ProductLeaderboard | undefined> {
    const foundProductLeaderboard: ProductLeaderboardMikroOrm | null =
      await this.orm.em.findOne(
        ProductLeaderboardMikroOrm,
        productLeaderboardFindOneFilters,
      );

    return foundProductLeaderboard
      ? foundProductLeaderboard.toDomain()
      : undefined;
  }
  @CreateRequestContext()
  async findAll(): Promise<ProductLeaderboard[]> {
    const foundProductLeaderboards: ProductLeaderboardMikroOrm[] =
      await this.orm.em.find(ProductLeaderboardMikroOrm, {});

    return foundProductLeaderboards.map((productLeaderboard) =>
      productLeaderboard.toDomain(),
    );
  }

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

    await this.orm.em.persistAndFlush(productLeaderboardToCreate);

    return productLeaderboardToCreate.toDomain();
  }
}
