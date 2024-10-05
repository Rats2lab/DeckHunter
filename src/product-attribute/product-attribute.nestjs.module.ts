import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { OllamaNestjsModule } from '../ollama/ollama.nestjs.module';
import { ProductAttributeMikroOrm } from './entity/product-attribute.mikro-orm.entity';
import { ProductAttributeMikroOrmRepository } from './repository/product-attribute.mikro-orm.repository';
import { ProductAttributeCalculateAndCreateManyService } from './service/product-attribute.calculate-and-create-many.service';
import { ProductAttributeCountService } from './service/product-attribute.count.service';
import { ProductAttributeCreateManyService } from './service/product-attribute.create-many.service';
import { ProductAttributeCreatePromptToCreateAttributesService } from './service/product-attribute.create-prompt-to-create-attributes.service';
import { ProductAttributeCreateService } from './service/product-attribute.create.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([ProductAttributeMikroOrm]),
    OllamaNestjsModule,
  ],
  providers: [
    ProductAttributeMikroOrmRepository,
    ProductAttributeCountService,
    ProductAttributeCreateService,
    ProductAttributeCalculateAndCreateManyService,
    ProductAttributeCreateManyService,
    ProductAttributeCreatePromptToCreateAttributesService,
  ],
  exports: [
    ProductAttributeCountService,
    ProductAttributeCalculateAndCreateManyService,
  ],
})
export class ProductAttributeNestjsModule {}
