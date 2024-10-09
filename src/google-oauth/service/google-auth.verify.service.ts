import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GoogleAuthVerifyToken } from '../interface/google-auth.verify-token.interface';
import { GoogleOauth2Repository } from '../repository/google-auth.oauth2.repository';
import { GoogleAuthResponse } from '../interface/google-auth.response.interface';

@Injectable()
export class GoogleAuthVerifyService {
  constructor(
    private readonly googleOauth2Repository: GoogleOauth2Repository,
  ) {}

  async verify(
    googleAuthVerifyToken: GoogleAuthVerifyToken,
  ): Promise<GoogleAuthResponse> {
    try {
      const response: GoogleAuthResponse | undefined =
        await this.googleOauth2Repository.getAuthorizedInformation(
          googleAuthVerifyToken,
        );

      if (!response) {
        throw new UnauthorizedException('Can not obtain information');
      }

      return response;
    } catch (error) {
      throw new UnauthorizedException('Google token verification failed');
    }
  }
}
