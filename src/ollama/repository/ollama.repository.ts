import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatResponse, Ollama } from 'ollama';
import { OllamaModel } from '../enum/ollama.model.enum';
import { OllamaRole } from '../enum/ollama.role.enum';

@Injectable()
export class OllamaRepository {
  private ollamaClient: Ollama;

  constructor(private readonly configService: ConfigService) {
    this.ollamaClient = new Ollama({
      host: this.configService.getOrThrow<string>('DH_OLLAMA_HOST'),
    });
  }

  async createMessage(
    content: string,
    model: string = OllamaModel.QWEN2_5_05B,
  ): Promise<string> {
    const response: ChatResponse = await this.ollamaClient.chat({
      model: model,
      messages: [{ role: OllamaRole.USER, content }],
      stream: false,
    });

    return response.message.content;
  }

  async createMessageAsync(
    content: string,
    model: OllamaModel = OllamaModel.QWEN2_5_05B,
  ): Promise<string> {
    const response = await this.ollamaClient.chat({
      model: model,
      messages: [{ role: OllamaRole.USER, content }],
      stream: true,
    });

    let accumulatedResponse = '';
    for await (const part of response) {
      accumulatedResponse += part.message.content;
    }

    return accumulatedResponse;
  }
}
