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
import { PaginableResponseDto } from '../../common/paginable.response.dto';
import { ProductCreateDto } from '../dto/product.create.dto';
import { ProductDto } from '../dto/product.dto';
import { ProductFindFiltersDto } from '../dto/product.find-filters.dto';
import { ProductSeedDto } from '../dto/product.seed.dto';
import { ProductUpdateFieldsDto } from '../dto/product.update-fields.dto';
import { Product } from '../interface/product.interface';
import { ProductWithRelations } from '../interface/product.with-relations.interface';
import { ProductCreateService } from '../service/product.create.service';
import { ProductFindAllService } from '../service/product.find-all.service';
import { ProductFindOneService } from '../service/product.find-one.service';
import { ProductSeedService } from '../service/product.seed.service';
import { ProductUpdateService } from '../service/product.update.service';

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
    private readonly productSeedService: ProductSeedService,
  ) {}

  /*@ApiCreatedResponse({
    description: 'Product created',
    type: ProductDto,
  })
  @ApiBody({ type: ProductCreateDto })
  @Post()
  @ApiBearerAuth()
  async create(
    @Body() productCreateDto: ProductCreateDto,
  ): Promise<ProductDto> {
    const createdProduct: Product = await this.productCreateService.create(
      productCreateDto.toDomain(),
    );

    return new ProductDto(createdProduct);
  }*/

  @ApiCreatedResponse({
    description: 'Products seeded',
    type: ProductDto,
  })
  @ApiBody({ type: ProductSeedDto })
  @Post('seed')
  async seed(@Body() productSeedDto: ProductSeedDto): Promise<ProductDto[]> {
    const createdProducts: Product[] = await this.productSeedService.seed(
      productSeedDto.toDomain(),
    );

    return createdProducts.map(
      (createdProduct) => new ProductDto(createdProduct),
    );
  }

  @ApiOkResponse({
    description: 'Product found',
    type: ProductDto,
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
  })
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('language')
    language: string,
  ): Promise<ProductDto> {
    const foundProduct: ProductWithRelations =
      await this.productFindOneService.findOne({
        id,
      });
    return new ProductDto(foundProduct);
  }

  @ApiOkResponse({
    description: 'Products found',
    type: PaginableResponseDto<ProductDto>,
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: 'No product found',
  })
  @Get()
  async find(
    @Query() productFindFiltersDto: ProductFindFiltersDto,
  ): Promise<PaginableResponseDto<ProductDto>> {
    const foundProducts: ProductWithRelations[] =
      await this.productFindAllService.findAll(
        productFindFiltersDto.toDomain(),
      );

    return new PaginableResponseDto(
      foundProducts.map((product) => new ProductDto(product)),
    );
  }

  /*@ApiOkResponse({
    description: 'Product updated',
    type: ProductDto,
  })
  @Patch(':id')
  @ApiBearerAuth()
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() productUpdateFields: ProductUpdateFieldsDto,
  ): Promise<ProductDto> {
    const updatedProduct: Product = await this.productUpdateService.update(
      { id },
      productUpdateFields.toDomain(),
    );

    return new ProductDto(updatedProduct);
  }*/
}
