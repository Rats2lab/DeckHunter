import { ApiProperty } from '@nestjs/swagger';
import { InfrastructureObject } from '../../common/infrastructure.object.type';
import { GoogleAuthResponse } from '../interface/google-auth.response.interface';

export class GoogleAuthResponseDto
  implements InfrastructureObject<GoogleAuthResponse>
{
  @ApiProperty()
  userId: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  picture: string;

  constructor(product: GoogleAuthResponse) {
    Object.assign(this, product);
  }

  toDomain(): GoogleAuthResponse {
    return {
      userId: this.userId,
      email: this.email,
      name: this.name,
      picture: this.picture,
    };
  }
}
