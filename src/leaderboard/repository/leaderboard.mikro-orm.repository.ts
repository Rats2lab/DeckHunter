import {
  CreateRequestContext,
  EntityComparator,
  MikroORM,
} from '@mikro-orm/core';
import { InjectMikroORM } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { v4 } from 'uuid';
import { DATABASE_CONTEXT_NAME } from '../../database/constant/database.constant';
import { LeaderboardMikroOrm } from '../entity/leaderboard.mikro-orm.entity';
import { Leaderboard } from '../interface/leaderboard.interface';
import { LeaderboardCreate } from '../type/leaderboard.create.type';
import { LeaderboardFindFilters } from '../type/leaderboard.find-filters.type';
import { LeaderboardFindOneFilters } from '../type/leaderboard.find-one-filters.type';
import { LeaderboardUpdateFields } from '../type/leaderboard.update-fields.type';
import { LeaderboardUpdateFilters } from '../type/leaderboard.update-filters.type';

@Injectable()
export class LeaderboardMikroOrmRepository {
  constructor(
    @InjectMikroORM(DATABASE_CONTEXT_NAME) private readonly orm: MikroORM,
  ) {}

  @CreateRequestContext()
  async findOne(
    leaderboardFindOneFilters: LeaderboardFindOneFilters,
  ): Promise<Leaderboard | undefined> {
    const foundLeaderboard: LeaderboardMikroOrm | null =
      await this.orm.em.findOne(LeaderboardMikroOrm, leaderboardFindOneFilters);

    return foundLeaderboard ? foundLeaderboard.toDomain() : undefined;
  }

  @CreateRequestContext()
  async find(
    leaderboardFindFilters: LeaderboardFindFilters,
  ): Promise<Leaderboard[]> {
    const foundLeaderboard: LeaderboardMikroOrm[] = await this.orm.em.find(
      LeaderboardMikroOrm,
      {},
      {
        orderBy: { date: 'desc' },
        offset: leaderboardFindFilters.offset,
        limit: leaderboardFindFilters.limit,
      },
    );

    return foundLeaderboard.length
      ? foundLeaderboard.map((leaderboard) => leaderboard.toDomain())
      : [];
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

    await this.orm.em.persistAndFlush(leaderboardToCreate);

    return leaderboardToCreate.toDomain();
  }

  @CreateRequestContext()
  async update(
    leaderboardUpdateFilters: LeaderboardUpdateFilters,
    leaderboardUpdateFields: LeaderboardUpdateFields,
  ): Promise<Leaderboard | undefined> {
    const existingLeaderboard: LeaderboardMikroOrm | null =
      await this.orm.em.findOne(LeaderboardMikroOrm, leaderboardUpdateFilters);

    if (!existingLeaderboard) {
      return;
    }

    const entityComparator: EntityComparator = this.orm.em.getComparator();

    const entityWithoutChanges: boolean = entityComparator.matching(
      LeaderboardMikroOrm.name,
      existingLeaderboard,
      { ...existingLeaderboard, ...leaderboardUpdateFields },
    );

    if (entityWithoutChanges) {
      return existingLeaderboard.toDomain();
    }

    this.orm.em.assign(existingLeaderboard, leaderboardUpdateFields);

    this.orm.em.flush();

    return existingLeaderboard.toDomain();
  }
}
