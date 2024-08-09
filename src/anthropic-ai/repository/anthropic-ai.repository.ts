import { Anthropic } from '@anthropic-ai/sdk';
import { Message, TextBlock } from '@anthropic-ai/sdk/resources';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AnthropicAiModel } from '../enum/anthropic-ai.model.enum';
import { AnthropicAiRole } from '../enum/anthropic-ai.completion-role.enum';

/**
 * https://docs.anthropic.com/es/docs/intro-to-claude
 * https://yarnpkg.com/package?q=anthropic-ai&name=%40anthropic-ai%2Fsdk
 */
@Injectable()
export class AnthropicAiRepository {
  private anthropicAiClient: Anthropic;

  constructor(private readonly configService: ConfigService) {
    this.anthropicAiClient = new Anthropic({
      apiKey: this.configService.getOrThrow<string>('ANTHROPIC_AI_APIKEY'),
    });
  }

  async createMessage(
    content: string,
    config: {
      model: AnthropicAiModel;
      maxTokens: number;
    } = {
      model: AnthropicAiModel.CLAUDE_3_5_SONNET,
      maxTokens: 1024,
    },
  ): Promise<string | undefined> {
    const message: Message = await this.anthropicAiClient.messages.create({
      max_tokens: config.maxTokens,
      messages: [{ role: AnthropicAiRole.USER, content }],
      model: config.model,
    });

    if (message.content.length > 0) {
      return (message.content[0] as TextBlock).text;
    }
  }
}
