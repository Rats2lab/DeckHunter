import { ApiProperty } from '@nestjs/swagger';
import { InfrastructureObject } from '../../common/infrastructure.object.type';
import { OllamaSendMessageResponse } from '../interface/ollama.send-message-response.interface';

export class OllamaSendMessageResponseDto
  implements InfrastructureObject<OllamaSendMessageResponse>
{
  @ApiProperty()
  response: string;

  constructor(sendMessageResponse: OllamaSendMessageResponse) {
    Object.assign(this, sendMessageResponse);
  }

  toDomain(): OllamaSendMessageResponse {
    return {
      response: this.response,
    };
  }
}
