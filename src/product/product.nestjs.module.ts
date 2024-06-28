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

@Module({
  imports: [
    MikroOrmModule.forFeature([ProductMikroOrm]),
    ProductProviderNestjsModule,
    LeaderboardNestjsModule,
  ],
  controllers: [ProductHttpController],
  providers: [
    ProductCreateService,
    ProductFindOneService,
    ProductFindAllService,
    ProductUpdateService,
    ProductMikroOrmRepository,
    ProductCreateManyService,
  ],
  exports: [ProductCreateService],
})
export class ProductNestjsModule {}
