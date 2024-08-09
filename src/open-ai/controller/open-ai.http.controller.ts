import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OpenAiSendPromptDto } from '../dto/open-ai.send-prompt.dto';
import { OpenAiSendPromptResponse } from '../interface/open-ai.send-prompt-response.interface';
import { OpenAiSendPromptService } from '../service/open-ai.send-prompt.service';
import { OpenAiSendPromptResponseDto } from '../dto/open-ai.send-prompt-response.dto';
@ApiForbiddenResponse({ description: 'Authorization is required' })
@ApiBadRequestResponse({ description: 'Bad request' })
@ApiTags('OpenAi')
@Controller({ path: 'open-ai', version: '1' })
export class OpenAiHttpController {
  constructor(
    private readonly openAiSendPromptService: OpenAiSendPromptService,
  ) {}

  @ApiCreatedResponse({
    description: 'OpenAi response',
    type: OpenAiSendPromptResponseDto,
  })
  @ApiBody({ type: OpenAiSendPromptDto })
  @Post()
  @ApiBearerAuth()
  async create(
    @Body() sendPromptDto: OpenAiSendPromptDto,
  ): Promise<OpenAiSendPromptResponseDto> {
    const openAiResponse: OpenAiSendPromptResponse =
      await this.openAiSendPromptService.sendPrompt(sendPromptDto.toDomain());

    return new OpenAiSendPromptResponseDto(openAiResponse);
  }
}
