import { Injectable } from '@nestjs/common';
import { OpenAiRepository } from '../repository/open-ai.repository';
import { OpenAiSendPromptResponse } from '../interface/open-ai.send-prompt-response.interface';
import { OpenAiSendPrompt } from '../interface/open-ai.send-prompt.interface';

@Injectable()
export class OpenAiSendPromptService {
  constructor(private readonly openAiProviderRepository: OpenAiRepository) {}

  async sendPrompt(
    sendPrompt: OpenAiSendPrompt,
  ): Promise<OpenAiSendPromptResponse> {
    const aiResponse: string | undefined =
      await this.openAiProviderRepository.createChatCompletion(
        sendPrompt.prompt,
      );

    if (aiResponse) {
      return {
        response: aiResponse,
      };
    }

    return {
      response: '',
    };
  }
}
