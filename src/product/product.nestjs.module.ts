import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ProductHttpController } from './controller/product.http.controller';
import { ProductMikroOrm } from './entity/product.mikro-orm.entity';
import { ProductMikroOrmRepository } from './repository/product.mikro-orm.repository';
import { ProductCreateService } from './service/product.create.service';
import { ProductFindAllService } from './service/product.find-all.service';
import { ProductFindOneService } from './service/product.find-one.service';
import { ProductUpdateService } from './service/product.update.service';

@Module({
  imports: [MikroOrmModule.forFeature([ProductMikroOrm])],
  controllers: [ProductHttpController],
  providers: [
    ProductCreateService,
    ProductFindOneService,
    ProductFindAllService,
    ProductUpdateService,
    ProductMikroOrmRepository,
  ],
  exports: [ProductCreateService],
})
export class ProductNestjsModule {}
