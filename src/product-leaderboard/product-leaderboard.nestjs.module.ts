import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ProductLeaderboardMikroOrm } from './entity/product-leaderboard.mikro-orm.entity';
import { ProductLeaderboardMikroOrmRepository } from './repository/product-leaderboard.mikro-orm.repository';
import { ProductLeaderboardCreateService } from './service/product-leaderboard.create.service';

@Module({
  imports: [MikroOrmModule.forFeature([ProductLeaderboardMikroOrm])],
  providers: [
    ProductLeaderboardCreateService,
    ProductLeaderboardMikroOrmRepository,
  ],
})
export class ProductLeaderboardNestjsModule {}
