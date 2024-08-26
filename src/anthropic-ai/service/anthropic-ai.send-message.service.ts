import { Injectable } from '@nestjs/common';
import { AnthropicAiRepository } from '../repository/anthropic-ai.repository';
import { AnthropicAiSendMessage } from '../interface/anthropic-ai.send-message.interface';
import { AnthropicAiSendMessageResponse } from '../interface/anthropic-ai.send-message-response.interface';

@Injectable()
export class AnthropicAiSendMessageService {
  constructor(private readonly anthropicAiRepository: AnthropicAiRepository) {}

  async sendMessage(
    sendMessage: AnthropicAiSendMessage,
  ): Promise<AnthropicAiSendMessageResponse> {
    const aiResponse: string | undefined =
      await this.anthropicAiRepository.createMessage(sendMessage.content);

    return {
      response: aiResponse,
    };
  }
}
