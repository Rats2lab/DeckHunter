import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
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
import { ProductRaw } from '../interface/product.raw.interface';
import { ProductCreateFromJsonService } from '../service/product.create-from-json.service';
import { ProductFindAllService } from '../service/product.find-all.service';
import { ProductFindOneService } from '../service/product.find-one.service';

@ApiBearerAuth()
@ApiForbiddenResponse({ description: 'Authorization is required' })
@ApiBadRequestResponse({ description: 'Bad request' })
@ApiTags('Product')
@Controller({ path: 'product', version: '1' })
export class ProductHttpController {
  constructor(
    private readonly productCreateFromJsonService: ProductCreateFromJsonService,
    private readonly productFindOneService: ProductFindOneService,
    private readonly productFindAllService: ProductFindAllService,
  ) {}

  @Post()
  async create(@Body() rawProduct: ProductRaw): Promise<ProductDto> {
    const createdProduct: Product =
      await this.productCreateFromJsonService.create(rawProduct);
    return new ProductDto(createdProduct);
  }

  @ApiOkResponse({
    description: 'Product found',
    type: ProductDto,
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
  })
  @Get(':id')
  async find(@Param('id', ParseUUIDPipe) id: string): Promise<ProductDto> {
    const foundProduct: Product = await this.productFindOneService.findOne({
      id,
    });
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
    dateFrom: Date,
    @Query('dateTo')
    dateTo: Date,
  ): Promise<ProductDto[]> {
    const foundProducts: Product[] = await this.productFindAllService.findAll();
    return foundProducts.map((product) => new ProductDto(product));
  }
}
