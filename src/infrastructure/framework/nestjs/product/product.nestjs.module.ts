import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ProductMikroOrm } from '../../../persistence/mikro-orm/product/entity/product.mikro-orm.entity';
import { ProductRepository } from '../../../../domain/product/repository/product.repository';
import { ProductMikroOrmRepository } from '../../../persistence/mikro-orm/product/repository/product.mikro-orm.repository';
import { ProductCreateFromJsonService } from '../../../../application/product/product.create-from-json.service';
import { ProductCreateService } from '../../../../application/product/product.create.service';
import { ProductHttpController } from '../../../rest/http/product/controller/product.http.controller';
import { ProductFindOneService } from '../../../../application/product/product.find-one.service';
import { ProductFindAllService } from '../../../../application/product/product.find-all.service';

@Module({
  imports: [MikroOrmModule.forFeature([ProductMikroOrm])],
  controllers: [ProductHttpController],
  providers: [
    ProductCreateFromJsonService,
    ProductCreateService,
    ProductFindOneService,
    ProductFindAllService,
    {
      provide: ProductRepository,
      useClass: ProductMikroOrmRepository,
    },
  ],
})
export class ProductNestjsModule {}
