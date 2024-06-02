import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { LeaderboardMikroOrm } from './entity/leaderboard.mikro-orm.entity';
import { LeaderboardMikroOrmRepository } from './repository/leaderboard.mikro-orm.repository';
import { LeaderboardCreateService } from './service/leaderboard.create.service';
import { LeaderboardHttpController } from './controller/leaderboard.http.controller';
import { LeaderboardUpdateService } from './service/leaderboard.update.service';
import { LeaderboardFindOneService } from './service/leaderboard.find-one.service';
import { LeaderboardFindService } from './service/leaderboard.find.service';

@Module({
  imports: [MikroOrmModule.forFeature([LeaderboardMikroOrm])],
  providers: [
    LeaderboardCreateService,
    LeaderboardFindOneService,
    LeaderboardFindService,
    LeaderboardUpdateService,
    LeaderboardMikroOrmRepository,
  ],
  controllers: [LeaderboardHttpController],
})
export class LeaderboardNestjsModule {}
