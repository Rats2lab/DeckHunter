import { ApiProperty } from '@nestjs/swagger';
import { InfrastructureObject } from '../../common/infrastructure.object.type';
import { AnthropicAiSendMessageResponse } from '../interface/anthropic-ai.send-message-response.interface';

export class AnthropicAiSendMessageResponseDto
  implements InfrastructureObject<AnthropicAiSendMessageResponse>
{
  @ApiProperty()
  response: string;

  constructor(sendMessageResponse: AnthropicAiSendMessageResponse) {
    Object.assign(this, sendMessageResponse);
  }

  toDomain(): AnthropicAiSendMessageResponse {
    return {
      response: this.response,
    };
  }
}
