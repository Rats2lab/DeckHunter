import { Injectable } from '@nestjs/common';
import { OllamaRepository } from '../repository/ollama.repository';
import { OllamaSendMessage } from '../interface/ollama.send-message.interface';
import { OllamaSendMessageResponse } from '../interface/ollama.send-message-response.interface';

@Injectable()
export class OllamaSendMessageService {
  constructor(private readonly ollamaRepository: OllamaRepository) {}

  async sendMessage(
    sendMessage: OllamaSendMessage,
  ): Promise<OllamaSendMessageResponse> {
    const aiResponse: string = await this.ollamaRepository.createMessage(
      sendMessage.content,
      sendMessage.model,
    );

    return {
      response: aiResponse,
    };
  }
}
