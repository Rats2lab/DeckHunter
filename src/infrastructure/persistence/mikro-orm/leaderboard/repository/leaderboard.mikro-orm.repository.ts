import { CreateRequestContext, MikroORM } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { v4 } from 'uuid';
import { Leaderboard } from '../../../../../domain/leaderboard/interface/leaderboard.interface';
import { LeaderboardRepository } from '../../../../../domain/leaderboard/repository/leaderboard.repository';
import { LeaderboardCreate } from '../../../../../domain/leaderboard/type/leaderboard.create.type';
import { LeaderboardMikroOrm } from '../entity/leaderboard.mikro-orm.entity';

@Injectable()
export class LeaderboardMikroOrmRepository implements LeaderboardRepository {
  constructor(private readonly orm: MikroORM) {}

  @CreateRequestContext()
  async insertOne(leaderboardCreate: LeaderboardCreate): Promise<Leaderboard> {
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
}
