import { ApiProperty } from '@nestjs/swagger';
import { InfrastructureObject } from '../../common/infrastructure.object.type';
import { GoogleAuthVerifyToken } from '../interface/google-auth.verify-token.interface';
import { IsNotEmpty, IsString } from 'class-validator';

export class GoogleAuthVerifyTokenDto
  implements InfrastructureObject<GoogleAuthVerifyToken>
{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  token: string;

  constructor(product: GoogleAuthVerifyToken) {
    Object.assign(this, product);
  }

  toDomain(): GoogleAuthVerifyToken {
    return {
      token: this.token,
    };
  }
}
