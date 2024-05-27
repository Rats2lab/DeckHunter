import { CreateRequestContext, MikroORM } from '@mikro-orm/core';
import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { DateTime } from 'luxon';
import { v4 } from 'uuid';
import { Leaderboard } from '../interface/leaderboard.interface';
import { LeaderboardCreate } from '../type/leaderboard.create.type';
import { LeaderboardMikroOrm } from '../entity/leaderboard.mikro-orm.entity';
import { LeaderboardUpdateFields } from '../type/leaderboard.update-fields.type';
import { LeaderboardUpdateFilters } from '../type/leaderboard.update-filters.type';
import { LeaderboardFindOneFilters } from '../type/leaderboard.find-one-filters.type';

@Injectable()
export class LeaderboardMikroOrmRepository {
  constructor(private readonly orm: MikroORM) {}

  @CreateRequestContext()
  async findOne(
    leaderboardFindOneFilters: LeaderboardFindOneFilters,
  ): Promise<Leaderboard | undefined> {
    const foundLeaderboard: LeaderboardMikroOrm | null =
      await this.orm.em.findOne(LeaderboardMikroOrm, leaderboardFindOneFilters);

    return foundLeaderboard ? foundLeaderboard.toDomain() : undefined;
  }

  @CreateRequestContext()
  async insert(leaderboardCreate: LeaderboardCreate): Promise<Leaderboard> {
    const leaderboardToCreate: LeaderboardMikroOrm = this.orm.em.create(
      LeaderboardMikroOrm,
      {
        id: v4(),
        ...leaderboardCreate,
        createdAt: DateTime.now().toJSDate(),
        updatedAt: DateTime.now().toJSDate(),
      },
    );

    await this.orm.em.persistAndFlush(leaderboardCreate);

    return leaderboardToCreate.toDomain();
  }

  @CreateRequestContext()
  async update(
    leaderboardUpdateFilters: LeaderboardUpdateFilters,
    leaderboardUpdateFields: LeaderboardUpdateFields,
  ): Promise<Leaderboard> {
    throw new MethodNotAllowedException('Method not implemented');
  }
}
