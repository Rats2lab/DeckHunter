import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { LeaderboardMikroOrm } from './entity/leaderboard.mikro-orm.entity';
import { LeaderboardMikroOrmRepository } from './repository/leaderboard.mikro-orm.repository';
import { LeaderboardCreateService } from './service/leaderboard.create.service';
import { LeaderboardMockedHttpController } from './controller/leaderboard.mocked-http.controller';

@Module({
  imports: [MikroOrmModule.forFeature([LeaderboardMikroOrm])],
  providers: [LeaderboardCreateService, LeaderboardMikroOrmRepository],
  controllers: [LeaderboardMockedHttpController],
})
export class LeaderboardNestjsModule {}
