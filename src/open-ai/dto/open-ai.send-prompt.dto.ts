import { ApiProperty } from '@nestjs/swagger';
import { InfrastructureObject } from '../../common/infrastructure.object.type';
import { OpenAiSendPrompt } from '../interface/open-ai.send-prompt.interface';

export class OpenAiSendPromptDto
  implements InfrastructureObject<OpenAiSendPrompt>
{
  @ApiProperty()
  prompt: string;

  constructor(sendPrompt: OpenAiSendPrompt) {
    Object.assign(this, sendPrompt);
  }

  toDomain(): OpenAiSendPrompt {
    return {
      prompt: this.prompt,
    };
  }
}
