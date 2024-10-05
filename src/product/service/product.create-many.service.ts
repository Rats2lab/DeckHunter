import { Injectable } from '@nestjs/common';
import { Product } from '../interface/product.interface';
import { ProductCreate } from '../type/product.create.type';
import { ProductCreateIfNotExistsService } from './product.create-if-not-exists.service';
import { ProductAttributeCountService } from '../../product-attribute/service/product-attribute.count.service';
import { ProductPromptCreateAttributes } from '../type/product.prompt-create-attributes.type';
import { ProductAttributeCalculateAndCreateManyService } from '../../product-attribute/service/product-attribute.calculate-and-create-many.service';

@Injectable()
export class ProductCreateManyService {
  constructor(
    private readonly productCreateIfNotExistsService: ProductCreateIfNotExistsService,
    private readonly productAttributeCalculateAndCreateManyService: ProductAttributeCalculateAndCreateManyService,
    private readonly productAttributeCountService: ProductAttributeCountService,
  ) {}

  async createMany(productsCreate: ProductCreate[]): Promise<Product[]> {
    const createdProducts: Product[] = [];
    const productWithoutAttributes: ProductPromptCreateAttributes[] = [];

    for (const productCreate of productsCreate) {
      const createdProduct: Product =
        await this.productCreateIfNotExistsService.createIfNotExists(
          productCreate,
        );

      createdProducts.push(createdProduct);

      const existingAttributes: number =
        await this.productAttributeCountService.count({
          productId: createdProduct.id,
        });

      if (!existingAttributes) {
        productWithoutAttributes.push({
          id: createdProduct.id,
          tagline: createdProduct.tagline,
          description: createdProduct.description,
        });
      }
    }

    if (productWithoutAttributes.length) {
      await this.productAttributeCalculateAndCreateManyService.createMany(
        createdProducts,
      );
    }

    return createdProducts;
  }
}
