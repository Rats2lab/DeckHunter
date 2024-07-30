import { Injectable } from '@nestjs/common';
import { OpenAiRepository } from '../repository/open-ai.repository';

@Injectable()
export class OpenAiSendPromptService {
  constructor(private readonly openAiProviderRepository: OpenAiRepository) {}

  async sendPrompt(promptContent: string): Promise<string | undefined> {
    return this.openAiProviderRepository.createChatCompletion(promptContent);
  }
}
