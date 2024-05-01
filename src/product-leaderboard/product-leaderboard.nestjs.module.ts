import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ProductLeaderboardRepository } from './repository/product-leaderboard.repository';
import { ProductLeaderboardMikroOrm } from './entity/product-leaderboard.mikro-orm.entity';
import { ProductLeaderboardMikroOrmRepository } from './repository/product-leaderboard.mikro-orm.repository';
import { ProductLeaderboardCreateService } from './service/product-leaderboard.create.service';

@Module({
  imports: [MikroOrmModule.forFeature([ProductLeaderboardMikroOrm])],
  providers: [
    ProductLeaderboardCreateService,
    {
      provide: ProductLeaderboardRepository,
      useClass: ProductLeaderboardMikroOrmRepository,
    },
  ],
})
export class ProductLeaderboardNestjsModule {}
