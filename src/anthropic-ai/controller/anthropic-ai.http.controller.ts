import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AnthropicAiSendMessageResponseDto } from '../dto/anthropic-ai.send-message-response.dto';
import { AnthropicAiSendMessageDto } from '../dto/anthropic-ai.send-message.dto';
import { AnthropicAiSendMessageResponse } from '../interface/anthropic-ai.send-message-response.interface';
import { AnthropicAiSendMessageService } from '../service/anthropic-ai.send-message.service';

@ApiForbiddenResponse({ description: 'Authorization is required' })
@ApiBadRequestResponse({ description: 'Bad request' })
@ApiTags('AnthropicAi')
@Controller({ path: 'anthropic-ai', version: '1' })
export class AnthropicAiHttpController {
  constructor(
    private readonly anthropicAiSendMessageService: AnthropicAiSendMessageService,
  ) {}

  @ApiCreatedResponse({
    description: 'AnthropicAi response',
    type: AnthropicAiSendMessageResponseDto,
  })
  @ApiBody({ type: AnthropicAiSendMessageDto })
  @Post()
  @ApiBearerAuth()
  async create(
    @Body() sendMessageDto: AnthropicAiSendMessageDto,
  ): Promise<AnthropicAiSendMessageResponseDto> {
    const anthropicAiResponse: AnthropicAiSendMessageResponse =
      await this.anthropicAiSendMessageService.sendMessage(
        sendMessageDto.toDomain(),
      );

    return new AnthropicAiSendMessageResponseDto(anthropicAiResponse);
  }
}
