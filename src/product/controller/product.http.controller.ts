import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductDto } from '../dto/product.dto';
import { ProductFindOneFiltersDto } from '../dto/product.find-one-filters.dto';
import { Product } from '../interface/product.interface';
import { ProductRaw } from '../interface/product.raw.interface';
import { ProductCreateFromJsonService } from '../service/product.create-from-json.service';
import { ProductFindAllService } from '../service/product.find-all.service';
import { ProductFindOneService } from '../service/product.find-one.service';

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
