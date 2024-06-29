import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ProductProviderNestjsModule } from '../product-provider/product-provider.nestjs.module';
import { ProductHttpController } from './controller/product.http.controller';
import { ProductMikroOrm } from './entity/product.mikro-orm.entity';
import { ProductMikroOrmRepository } from './repository/product.mikro-orm.repository';
import { ProductCreateService } from './service/product.create.service';
import { ProductFindAllService } from './service/product.find-all.service';
import { ProductFindOneService } from './service/product.find-one.service';
import { ProductUpdateService } from './service/product.update.service';
import { LeaderboardNestjsModule } from '../leaderboard/leaderboard.nestjs.module';
import { ProductCreateManyService } from './service/product.create-many.service';
import { ProductSeedService } from './service/product.seed.service';
import { ProductLeaderboardNestjsModule } from '../product-leaderboard/product-leaderboard.nestjs.module';
import { ProductCreateIfNotExistsService } from './service/product.create-if-not-exists.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([ProductMikroOrm]),
    ProductProviderNestjsModule,
    LeaderboardNestjsModule,
    ProductLeaderboardNestjsModule,
  ],
  controllers: [ProductHttpController],
  providers: [
    ProductCreateService,
    ProductFindOneService,
    ProductFindAllService,
    ProductUpdateService,
    ProductMikroOrmRepository,
    ProductCreateManyService,
    ProductSeedService,
    ProductCreateIfNotExistsService,
  ],
  exports: [ProductCreateService],
})
export class ProductNestjsModule {}
