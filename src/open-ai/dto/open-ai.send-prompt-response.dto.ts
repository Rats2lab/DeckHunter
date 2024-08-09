import { ApiProperty } from '@nestjs/swagger';
import { InfrastructureObject } from '../../common/infrastructure.object.type';
import { OpenAiSendPromptResponse } from '../interface/open-ai.send-prompt-response.interface';

export class OpenAiSendPromptResponseDto
  implements InfrastructureObject<OpenAiSendPromptResponse>
{
  @ApiProperty()
  response: string;

  constructor(sendPromptResponse: OpenAiSendPromptResponse) {
    Object.assign(this, sendPromptResponse);
  }

  toDomain(): OpenAiSendPromptResponse {
    return {
      response: this.response,
    };
  }
}
