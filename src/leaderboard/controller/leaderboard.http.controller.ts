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
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { LeaderboardCreateDto } from '../dto/leaderboard.create.dto';
import { LeaderboardDto } from '../dto/leaderboard.dto';
import { LeaderboardUpdateFieldsDto } from '../dto/leaderboard.update-fields.dto';
import { Leaderboard } from '../interface/leaderboard.interface';
import { LeaderboardCreateService } from '../service/leaderboard.create.service';
import { LeaderboardFindOneService } from '../service/leaderboard.find-one.service';
import { LeaderboardUpdateService } from '../service/leaderboard.update.service';
import { LeaderboardFindFiltersDto } from '../dto/leaderboard.find-filters.dto';
import { LeaderboardFindService } from '../service/leaderboard.find.service';
import { PaginableResponseDto } from '../../common/paginable.response.dto';
import { AiProviderSendMessageService } from '../../ai-provider/service/ai-provider.send-message.service';

@ApiForbiddenResponse({ description: 'Authorization is required' })
@ApiBadRequestResponse({ description: 'Bad request' })
@ApiTags('Leaderboard')
@Controller({ path: 'leaderboard', version: '1' })
export class LeaderboardHttpController {
  constructor(
    private readonly leaderboardFindOneService: LeaderboardFindOneService,
    private readonly leaderboardFindService: LeaderboardFindService,
    private readonly leaderboardCreateService: LeaderboardCreateService,
    private readonly leaderboardUpdateService: LeaderboardUpdateService,
    private readonly aiProviderSendMessageService: AiProviderSendMessageService,
  ) {}

  @ApiOkResponse({
    description: 'Leaderboard found',
    type: LeaderboardDto,
  })
  @ApiNotFoundResponse({
    description: 'Leaderboard not found',
  })
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<LeaderboardDto> {
    const foundLeaderboard: Leaderboard =
      await this.leaderboardFindOneService.findOne({
        id,
      });

    return new LeaderboardDto(foundLeaderboard);
  }

  @ApiOkResponse({
    description: 'Leaderboards found',
    type: PaginableResponseDto<LeaderboardDto>,
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: 'No leaderboard found',
  })
  @Get()
  async find(
    @Query() leaderboardFindOneFiltersDto: LeaderboardFindFiltersDto,
  ): Promise<PaginableResponseDto<LeaderboardDto>> {
    const foundLeaderboards: Leaderboard[] =
      await this.leaderboardFindService.find(
        leaderboardFindOneFiltersDto.toDomain(),
      );

    console.log(this.aiProviderSendMessageService);

    return new PaginableResponseDto(
      foundLeaderboards.map((leaderboard) => new LeaderboardDto(leaderboard)),
    );
  }

  /*@ApiCreatedResponse({
    description: 'Leaderboard created',
    type: LeaderboardDto,
  })
  @ApiBody({ type: LeaderboardCreateDto })
  @Post()
  @ApiBearerAuth()
  async create(
    @Body() createLeaderboard: LeaderboardCreateDto,
  ): Promise<LeaderboardDto> {
    const createdLeaderboard: Leaderboard =
      await this.leaderboardCreateService.create(createLeaderboard.toDomain());

    return new LeaderboardDto(createdLeaderboard);
  }

  @ApiOkResponse({
    description: 'Leaderboard updated',
    type: LeaderboardDto,
  })
  @Patch(':id')
  @ApiBearerAuth()
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() leaderboardUpdateFields: LeaderboardUpdateFieldsDto,
  ): Promise<LeaderboardDto> {
    const updatedLeaderboard: Leaderboard =
      await this.leaderboardUpdateService.update(
        { id },
        leaderboardUpdateFields.toDomain(),
      );

    return new LeaderboardDto(updatedLeaderboard);
  }*/
}
