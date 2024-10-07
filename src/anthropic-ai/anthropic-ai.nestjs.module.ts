import { DynamicModule, Module } from '@nestjs/common';
import { AnthropicAiRepository } from './repository/anthropic-ai.repository';
import { AnthropicAiSendMessageService } from './service/anthropic-ai.send-message.service';
import { AnthropicAiHttpController } from './controller/anthropic-ai.http.controller';

@Module({})
export class AnthropicAiNestjsModule {
  static register(): DynamicModule {
    return {
      module: AnthropicAiNestjsModule,
      //controllers: [AnthropicAiHttpController],
      providers: [AnthropicAiRepository, AnthropicAiSendMessageService],
      exports: [AnthropicAiSendMessageService],
    };
  }
}
