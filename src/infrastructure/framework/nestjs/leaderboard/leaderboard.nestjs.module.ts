import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { LeaderboardMikroOrm } from '../../../persistence/mikro-orm/leaderboard/entity/leaderboard.mikro-orm.entity';
import { LeaderboardRepository } from '../../../../domain/leaderboard/repository/leaderboard.repository';
import { LeaderboardMikroOrmRepository } from '../../../persistence/mikro-orm/leaderboard/repository/leaderboard.mikro-orm.repository';

@Module({
  imports: [MikroOrmModule.forFeature([LeaderboardMikroOrm])],
  providers: [
    {
      provide: LeaderboardRepository,
      useClass: LeaderboardMikroOrmRepository,
    },
  ],
})
export class LeaderboardNestjsModule {}
