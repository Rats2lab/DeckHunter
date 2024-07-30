import { Module } from '@nestjs/common';
import { AnthropicAiRepository } from './repository/anthropic-ai.repository';
import { AnthropicAiSendMessageService } from './service/anthropic-ai.send-message.service';

@Module({
  providers: [AnthropicAiRepository, AnthropicAiSendMessageService],
  exports: [AnthropicAiSendMessageService],
})
export class AnthropicAiNestjsModule {}
