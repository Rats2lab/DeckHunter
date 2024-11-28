import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';
import { OpenAiCompletionRole } from '../enum/open-ai.completion-role.enum';
import { OpenAiModel } from '../enum/open-ai.model.enum';

/**
 * https://platform.openai.com/docs/guides/gpt
 * https://yarnpkg.com/package?q=openai&name=openai
 */
@Injectable()
export class OpenAiRepository {
  private openAiClient: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.openAiClient = new OpenAI({
      apiKey: this.configService.getOrThrow<string>('DH_OPEN_AI_APIKEY'),
    });
  }

  async createChatCompletion(
    content: string,
    config: {
      model: OpenAiModel;
      temperature: number;
      n: number;
      maxTokens: number;
    } = {
      model: OpenAiModel.GPT_4O_MINI,
      temperature: 0,
      n: 1,
      maxTokens: 4096,
    },
  ): Promise<string | undefined> {
    const chatCompletionResponse: OpenAI.Chat.ChatCompletion =
      await this.openAiClient.chat.completions.create({
        model: config.model,
        messages: [
          {
            role: OpenAiCompletionRole.USER,
            content,
          },
        ],
        temperature: config.temperature,
        n: config.n,
        max_tokens: config.maxTokens,
      });

    if (
      chatCompletionResponse.choices.length > 0 &&
      chatCompletionResponse.choices[0].message?.content
    ) {
      return chatCompletionResponse.choices[0].message.content;
    }
  }
}
