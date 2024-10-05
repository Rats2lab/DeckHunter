import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OllamaSendMessageResponseDto } from '../dto/ollama.send-message-response.dto';
import { OllamaSendMessageDto } from '../dto/ollama.send-message.dto';
import { OllamaSendMessageResponse } from '../interface/ollama.send-message-response.interface';
import { OllamaSendMessageService } from '../service/ollama.send-message.service';

@ApiForbiddenResponse({ description: 'Authorization is required' })
@ApiBadRequestResponse({ description: 'Bad request' })
@ApiTags('Ollama')
@Controller({ path: 'ollama', version: '1' })
export class OllamaHttpController {
  constructor(
    private readonly anthropicAiSendMessageService: OllamaSendMessageService,
  ) {}

  @ApiCreatedResponse({
    description: 'Ollama response',
    type: OllamaSendMessageResponseDto,
  })
  @ApiBody({ type: OllamaSendMessageDto })
  @Post()
  @ApiBearerAuth()
  async create(
    @Body() sendMessageDto: OllamaSendMessageDto,
  ): Promise<OllamaSendMessageResponseDto> {
    const anthropicAiResponse: OllamaSendMessageResponse =
      await this.anthropicAiSendMessageService.sendMessage(
        sendMessageDto.toDomain(),
      );

    return new OllamaSendMessageResponseDto(anthropicAiResponse);
  }
}
