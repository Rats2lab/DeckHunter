import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ProductLeaderboardRepository } from '../../../../domain/product-leaderboard/repository/product-leaderboard.repository';
import { ProductLeaderboardMikroOrm } from '../../../persistence/mikro-orm/product-leaderboard/entity/product-leaderboard.mikro-orm.entity';
import { ProductLeaderboardMikroOrmRepository } from '../../../persistence/mikro-orm/product-leaderboard/repository/product-leaderboard.mikro-orm.repository';

@Module({
  imports: [MikroOrmModule.forFeature([ProductLeaderboardMikroOrm])],
  providers: [
    {
      provide: ProductLeaderboardRepository,
      useClass: ProductLeaderboardMikroOrmRepository,
    },
  ],
})
export class ProductLeaderboardNestjsModule {}
