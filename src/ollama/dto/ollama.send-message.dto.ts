import { ApiProperty } from '@nestjs/swagger';
import { InfrastructureObject } from '../../common/infrastructure.object.type';
import { OllamaSendMessage } from '../interface/ollama.send-message.interface';

export class OllamaSendMessageDto
  implements InfrastructureObject<OllamaSendMessage>
{
  @ApiProperty()
  content: string;

  @ApiProperty()
  model: string;

  constructor(sendMessage: OllamaSendMessage) {
    Object.assign(this, sendMessage);
  }

  toDomain(): OllamaSendMessage {
    return {
      content: this.content,
      model: this.model,
    };
  }
}
