import { ApiProperty } from '@nestjs/swagger';
import { InfrastructureObject } from '../../common/infrastructure.object.type';
import { AnthropicAiSendMessage } from '../interface/anthropic-ai.send-message.interface';

export class AnthropicAiSendMessageDto
  implements InfrastructureObject<AnthropicAiSendMessage>
{
  @ApiProperty()
  content: string;

  constructor(sendMessage: AnthropicAiSendMessage) {
    Object.assign(this, sendMessage);
  }

  toDomain(): AnthropicAiSendMessage {
    return {
      content: this.content,
    };
  }
}
