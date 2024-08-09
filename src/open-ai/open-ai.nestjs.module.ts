import { Module } from '@nestjs/common';
import { OpenAiRepository } from './repository/open-ai.repository';
import { OpenAiSendPromptService } from './service/open-ai.send-prompt.service';
import { OpenAiHttpController } from './controller/open-ai.http.controller';

@Module({
  //controllers: [OpenAiHttpController],
  providers: [OpenAiRepository, OpenAiSendPromptService],
  exports: [OpenAiSendPromptService],
})
export class OpenAiNestjsModule {}
