import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductDto } from '../dto/product.dto';
import { Product } from '../interface/product.interface';
import { ProductMother } from '../test/mother/product.mother';

/**
 * @deprecated
 */
//@ApiBearerAuth()
@ApiForbiddenResponse({ description: 'Authorization is required' })
@ApiBadRequestResponse({ description: 'Bad request' })
@ApiTags('Mocked product')
@Controller({ path: 'mocked/product', version: '1' })
export class ProductMockedHttpController {
  @ApiOkResponse({
    description: 'Product found',
    type: ProductDto,
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
  })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ProductDto> {
    const foundProduct: Product = new ProductMother().getRandomProduct();
    return new ProductDto(foundProduct);
  }

  @ApiOkResponse({
    description: 'Products found',
    type: ProductDto,
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: 'No product found',
  })
  @Get()
  async findAll(
    @Query('dateFrom')
    _dateFrom: Date,
    @Query('dateTo')
    _dateTo: Date,
    @Query('language')
    _language: string,
  ): Promise<ProductDto[]> {
    const foundProduct: ProductDto[] = [
      new ProductDto(new ProductMother().getRandomProduct()),
      new ProductDto(new ProductMother().getRandomProduct()),
      new ProductDto(new ProductMother().getRandomProduct()),
    ];

    return foundProduct;
  }
}
