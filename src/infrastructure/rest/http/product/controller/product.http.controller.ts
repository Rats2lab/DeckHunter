import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProductCreateFromJsonService } from '../../../../../application/product/product.create-from-json.service';
import { ProductRaw } from '../../../../../domain/product/interface/product.raw.interface';
import { ProductDto } from '../dto/product.dto';
import { Product } from '../../../../../domain/product/interface/product.interface';
import { ProductFindOneService } from '../../../../../application/product/product.find-one.service';
import { ProductFindOneFiltersDto } from '../dto/product.find-one-filters.dto';
import { ProductFindAllService } from '../../../../../application/product/product.find-all.service';

@Controller('product')
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

  @Get(':id')
  async find(
    @Param() queryParams: ProductFindOneFiltersDto,
  ): Promise<ProductDto> {
    const foundProduct: Product = await this.productFindOneService.findOne(
      queryParams.toDomain(),
    );
    return new ProductDto(foundProduct);
  }

  @Get()
  async findAll(): Promise<ProductDto[]> {
    const foundProducts: Product[] = await this.productFindAllService.findAll();
    return foundProducts.map((product) => new ProductDto(product));
  }
}
