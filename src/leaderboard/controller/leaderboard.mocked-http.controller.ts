import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LeaderboardDto } from '../dto/leaderboard.dto';
import { Leaderboard } from '../interface/leaderboard.interface';
import { LeaderboardMother } from '../test/mother/leaderboard.mother';

/**
 * @deprecated
 */
@ApiForbiddenResponse({ description: 'Authorization is required' })
@ApiBadRequestResponse({ description: 'Bad request' })
@ApiTags('Mocked leaderboard')
@Controller({ path: 'mocked/leaderboard', version: '1' })
export class LeaderboardMockedHttpController {
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
      new LeaderboardMother().getRandomLeaderboard();
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
  async findOneByDate(@Query('date') date: Date): Promise<LeaderboardDto[]> {
    const foundLeaderboard: LeaderboardDto[] = [
      new LeaderboardDto(new LeaderboardMother().getRandomLeaderboard()),
      new LeaderboardDto(new LeaderboardMother().getRandomLeaderboard()),
      new LeaderboardDto(new LeaderboardMother().getRandomLeaderboard()),
    ];

    return foundLeaderboard;
  }
}
