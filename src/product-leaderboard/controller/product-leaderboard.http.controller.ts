import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductLeaderboardCreateDto } from '../dto/product-leaderboard.create.dto';
import { ProductLeaderboardDto } from '../dto/product-leaderboard.dto';
import { ProductLeaderboard } from '../interface/product-leaderboard.interface';
import { ProductLeaderboardCreateService } from '../service/product-leaderboard.create.service';
import { ProductLeaderboardFindAllService } from '../service/product-leaderboard.find-all.service';
import { ProductLeaderboardFindOneService } from '../service/product-leaderboard.find-one.service';

@ApiForbiddenResponse({ description: 'Authorization is required' })
@ApiBadRequestResponse({ description: 'Bad request' })
@ApiTags('Product leaderboard')
@Controller({ path: 'product-leaderboard', version: '1' })
export class ProductLeaderboardHttpController {
  constructor(
    private readonly productLeaderboardCreateService: ProductLeaderboardCreateService,
    private readonly productLeaderboardFindOneService: ProductLeaderboardFindOneService,
    private readonly productLeaderboardFindAllService: ProductLeaderboardFindAllService,
  ) {}

  @ApiCreatedResponse({
    description: 'Product leaderboard created',
    type: ProductLeaderboardDto,
  })
  @ApiBody({ type: ProductLeaderboardCreateDto })
  @Post()
  async create(
    @Body() productLeaderboardCreateDto: ProductLeaderboardCreateDto,
  ): Promise<ProductLeaderboardDto> {
    const createdProductLeaderboard: ProductLeaderboard =
      await this.productLeaderboardCreateService.create(
        productLeaderboardCreateDto.toDomain(),
      );

    return new ProductLeaderboardDto(createdProductLeaderboard);
  }

  @ApiOkResponse({
    description: 'Product leaderboard found',
    type: ProductLeaderboardDto,
  })
  @ApiNotFoundResponse({
    description: 'Product leaderboard not found',
  })
  @Get(':id')
  async find(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ProductLeaderboardDto> {
    const foundProductLeaderboard: ProductLeaderboard =
      await this.productLeaderboardFindOneService.findOne({
        id,
      });
    return new ProductLeaderboardDto(foundProductLeaderboard);
  }

  @ApiOkResponse({
    description: 'Product leaderboards found',
    type: ProductLeaderboardDto,
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: 'No product leaderboard found',
  })
  @Get()
  async findAll(): Promise<ProductLeaderboardDto[]> {
    const foundProductLeaderboards: ProductLeaderboard[] =
      await this.productLeaderboardFindAllService.findAll();

    return foundProductLeaderboards.map(
      (productLeaderboard) => new ProductLeaderboardDto(productLeaderboard),
    );
  }
}
