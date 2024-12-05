import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { DATABASE_CONTEXT_NAME } from '../database/constant/database.constant';
import { LeaderboardHttpController } from './controller/leaderboard.http.controller';
import { LeaderboardMikroOrm } from './entity/leaderboard.mikro-orm.entity';
import { LeaderboardMikroOrmRepository } from './repository/leaderboard.mikro-orm.repository';
import { LeaderboardCreateIfNotExistsService } from './service/leaderboard.create-if-not-exists.service';
import { LeaderboardCreateService } from './service/leaderboard.create.service';
import { LeaderboardFindOneService } from './service/leaderboard.find-one.service';
import { LeaderboardFindService } from './service/leaderboard.find.service';
import { LeaderboardUpdateService } from './service/leaderboard.update.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([LeaderboardMikroOrm], DATABASE_CONTEXT_NAME),
  ],
  providers: [
    LeaderboardCreateService,
    LeaderboardFindOneService,
    LeaderboardFindService,
    LeaderboardUpdateService,
    LeaderboardMikroOrmRepository,
    LeaderboardCreateIfNotExistsService,
  ],
  controllers: [LeaderboardHttpController],
  exports: [LeaderboardCreateIfNotExistsService],
})
export class LeaderboardNestjsModule {}
