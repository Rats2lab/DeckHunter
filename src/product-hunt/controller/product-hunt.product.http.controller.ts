import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductHuntProductDto } from '../dto/product-hunt.product.dto';
import { ProductHuntCreateWebProductService } from '../service/product-hunt.create-web-product.service';
import { ProductDto } from '../../product/dto/product.dto';
import { Product } from '../../product/interface/product.interface';

//@ApiBearerAuth()
@ApiForbiddenResponse({ description: 'Authorization is required' })
@ApiBadRequestResponse({ description: 'Bad request' })
@ApiTags('Product Hunt: Product')
@Controller({ path: 'product/product-hunt', version: '1' })
export class ProductHuntProductHttpController {
  constructor(
    private readonly productHuntCreateService: ProductHuntCreateWebProductService,
  ) {}

  @ApiCreatedResponse({
    description: 'Product created',
    type: ProductDto,
  })
  @ApiBody({ type: ProductHuntProductDto })
  @Post()
  async create(@Body() webProduct: ProductHuntProductDto): Promise<ProductDto> {
    const createdProduct: Product =
      await this.productHuntCreateService.createProduct(webProduct.toDomain());

    return new ProductDto(createdProduct);
  }
}
