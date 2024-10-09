import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginTicket, OAuth2Client, TokenPayload } from 'google-auth-library';
import { GoogleAuthResponse } from '../interface/google-auth.response.interface';
import { GoogleAuthVerifyToken } from '../interface/google-auth.verify-token.interface';

@Injectable()
export class GoogleOauth2Repository {
  private readonly oAuth2Client: OAuth2Client;

  constructor(private readonly configService: ConfigService) {
    this.oAuth2Client = new OAuth2Client(
      this.configService.getOrThrow<string>('GOOGLE_CLIENT_ID'),
    );
  }

  async getAuthorizedInformation(
    googleAuthVerifyToken: GoogleAuthVerifyToken,
  ): Promise<GoogleAuthResponse | undefined> {
    const clientId: string =
      this.configService.getOrThrow<string>('GOOGLE_CLIENT_ID');

    const loginTicket: LoginTicket = await this.oAuth2Client.verifyIdToken({
      idToken: googleAuthVerifyToken.token,
      audience: clientId,
    });

    const tokenPayload: TokenPayload = loginTicket.getPayload();

    if (tokenPayload) {
      return {
        userId: tokenPayload.sub,
        email: tokenPayload.email,
        name: tokenPayload.name,
        picture: tokenPayload.picture,
      };
    }
  }
}
