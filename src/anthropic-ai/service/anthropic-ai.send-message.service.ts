import { Injectable } from '@nestjs/common';
import { AnthropicAiRepository } from '../repository/anthropic-ai.repository';

@Injectable()
export class AnthropicAiSendMessageService {
  constructor(private readonly anthropicAiRepository: AnthropicAiRepository) {}

  async sendMessage(content: string): Promise<string | undefined> {
    return this.anthropicAiRepository.createMessage(content);
  }
}
