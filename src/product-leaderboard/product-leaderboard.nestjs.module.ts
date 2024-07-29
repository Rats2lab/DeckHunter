import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ProductLeaderboardMikroOrm } from './entity/product-leaderboard.mikro-orm.entity';
import { ProductLeaderboardMikroOrmRepository } from './repository/product-leaderboard.mikro-orm.repository';
import { ProductLeaderboardCreateManyService } from './service/product-leaderboard.create-many.service';
import { ProductLeaderboardCreateService } from './service/product-leaderboard.create.service';
import { ProductLeaderboardFindAllService } from './service/product-leaderboard.find-all.service';
import { ProductLeaderboardFindOneService } from './service/product-leaderboard.find-one.service';

@Module({
  imports: [MikroOrmModule.forFeature([ProductLeaderboardMikroOrm])],
  providers: [
    ProductLeaderboardCreateService,
    ProductLeaderboardFindAllService,
    ProductLeaderboardFindOneService,
    ProductLeaderboardMikroOrmRepository,
    ProductLeaderboardCreateManyService,
  ],
  exports: [ProductLeaderboardCreateManyService],
})
export class ProductLeaderboardNestjsModule {}
