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
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LeaderboardCreateDto } from '../dto/leaderboard.create.dto';
import { LeaderboardDto } from '../dto/leaderboard.dto';
import { LeaderboardUpdateFieldsDto } from '../dto/leaderboard.update-fields.dto';
import { Leaderboard } from '../interface/leaderboard.interface';
import { LeaderboardCreateService } from '../service/leaderboard.create.service';
import { LeaderboardFindOneService } from '../service/leaderboard.find-one.service';
import { LeaderboardUpdateService } from '../service/leaderboard.update.service';

@ApiForbiddenResponse({ description: 'Authorization is required' })
@ApiBadRequestResponse({ description: 'Bad request' })
@ApiTags('Leaderboard')
@Controller({ path: 'leaderboard', version: '1' })
export class LeaderboardHttpController {
  constructor(
    private readonly leaderboardFindService: LeaderboardFindOneService,
    private readonly leaderboardCreateService: LeaderboardCreateService,
    private readonly leaderboardUpdateService: LeaderboardUpdateService,
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
      await this.leaderboardFindService.findOne({
        id,
      });

    return new LeaderboardDto(foundLeaderboard);
  }

  @ApiOkResponse({
    description: 'Leaderboard found',
    type: LeaderboardDto,
  })
  @ApiNotFoundResponse({
    description: 'Leaderboard not found',
  })
  @Get()
  async findOneByDate(@Query('date') date: Date): Promise<LeaderboardDto> {
    const foundLeaderboard: Leaderboard =
      await this.leaderboardFindService.findOne({
        date,
      });

    return new LeaderboardDto(foundLeaderboard);
  }

  @ApiCreatedResponse({
    description: 'Leaderboard created',
    type: LeaderboardDto,
  })
  @Post()
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
  }
}
