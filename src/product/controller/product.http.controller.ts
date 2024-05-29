import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductCreateDto } from '../dto/product.create.dto';
import { ProductDto } from '../dto/product.dto';
import { ProductUpdateFieldsDto } from '../dto/product.update-fields.dto';
import { Product } from '../interface/product.interface';
import { ProductCreateService } from '../service/product.create.service';
import { ProductFindAllService } from '../service/product.find-all.service';
import { ProductFindOneService } from '../service/product.find-one.service';
import { ProductUpdateService } from '../service/product.update.service';
import { ProductWithLeaderboards } from '../interface/product.with-leaderboards.interface';

//@ApiBearerAuth()
@ApiForbiddenResponse({ description: 'Authorization is required' })
@ApiBadRequestResponse({ description: 'Bad request' })
@ApiTags('Product')
@Controller({ path: 'product', version: '1' })
export class ProductHttpController {
  constructor(
    private readonly productCreateService: ProductCreateService,
    private readonly productFindOneService: ProductFindOneService,
    private readonly productFindAllService: ProductFindAllService,
    private readonly productUpdateService: ProductUpdateService,
  ) {}

  @ApiCreatedResponse({
    description: 'Product created',
    type: ProductDto,
  })
  @ApiBody({ type: ProductCreateDto })
  @Post()
  async create(
    @Body() productCreateDto: ProductCreateDto,
  ): Promise<ProductDto> {
    const createdProduct: Product = await this.productCreateService.create(
      productCreateDto.toDomain(),
    );

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
  async find(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('language')
    language: string,
  ): Promise<ProductDto> {
    const foundProduct: ProductWithLeaderboards =
      await this.productFindOneService.findOne({
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
    @Query('language')
    _language: string,
  ): Promise<ProductDto[]> {
    const foundProducts: ProductWithLeaderboards[] =
      await this.productFindAllService.findAll();
    return foundProducts.map((product) => new ProductDto(product));
  }

  @ApiOkResponse({
    description: 'Product updated',
    type: ProductDto,
  })
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() productUpdateFields: ProductUpdateFieldsDto,
  ): Promise<ProductDto> {
    const updatedProduct: Product = await this.productUpdateService.update(
      { id },
      productUpdateFields.toDomain(),
    );

    return new ProductDto(updatedProduct);
  }
}
