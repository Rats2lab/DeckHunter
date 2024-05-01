import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { LeaderboardMikroOrm } from './entity/leaderboard.mikro-orm.entity';
import { LeaderboardMikroOrmRepository } from './repository/leaderboard.mikro-orm.repository';
import { LeaderboardRepository } from './repository/leaderboard.repository';
import { LeaderboardCreateService } from './service/leaderboard.create.service';

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
