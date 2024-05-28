import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductDto } from '../dto/product.dto';
import { ProductRawDto } from '../dto/product.raw.dto';
import { Product } from '../interface/product.interface';
import { ProductCreateFromJsonService } from '../service/product.create-from-json.service';

//@ApiBearerAuth()
@ApiForbiddenResponse({ description: 'Authorization is required' })
@ApiBadRequestResponse({ description: 'Bad request' })
@ApiTags('Product raw')
@Controller({ path: 'product-raw', version: '1' })
export class ProductRawHttpController {
  constructor(
    private readonly productCreateFromJsonService: ProductCreateFromJsonService,
  ) {}

  @ApiCreatedResponse({
    description: 'Product created',
    type: ProductDto,
  })
  @ApiBody({ type: ProductRawDto })
  @Post()
  async create(@Body() rawProduct: ProductRawDto): Promise<ProductDto> {
    const createdProduct: Product =
      await this.productCreateFromJsonService.create(rawProduct.toDomain());

    return new ProductDto(createdProduct);
  }
}
