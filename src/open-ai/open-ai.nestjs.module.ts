import { Module } from '@nestjs/common';
import { OpenAiRepository } from './repository/open-ai.repository';
import { OpenAiSendPromptService } from './service/open-ai.send-prompt.service';

@Module({
  providers: [OpenAiRepository, OpenAiSendPromptService],
  exports: [OpenAiSendPromptService],
})
export class OpenAiNestjsModule {}
