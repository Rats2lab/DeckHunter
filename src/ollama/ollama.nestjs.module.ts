import { Module } from '@nestjs/common';
import { OllamaHttpController } from './controller/ollama.http.controller';
import { OllamaRepository } from './repository/ollama.repository';
import { OllamaSendMessageService } from './service/ollama.send-message.service';

@Module({
  controllers: [OllamaHttpController],
  providers: [OllamaRepository, OllamaSendMessageService],
  exports: [OllamaSendMessageService],
})
export class OllamaNestjsModule {}
