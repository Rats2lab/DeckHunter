import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { LeaderboardMikroOrm } from '../../../persistence/mikro-orm/leaderboard/entity/leaderboard.mikro-orm.entity';
import { LeaderboardRepository } from '../../../../domain/leaderboard/repository/leaderboard.repository';
import { LeaderboardMikroOrmRepository } from '../../../persistence/mikro-orm/leaderboard/repository/leaderboard.mikro-orm.repository';
import { LeaderboardCreateService } from '../../../../application/leaderboard/leaderboard.create.service';

@Module({
  imports: [MikroOrmModule.forFeature([LeaderboardMikroOrm])],
  providers: [
    LeaderboardCreateService,
    {
      provide: LeaderboardRepository,
      useClass: LeaderboardMikroOrmRepository,
    },
  ],
})
export class LeaderboardNestjsModule {}
