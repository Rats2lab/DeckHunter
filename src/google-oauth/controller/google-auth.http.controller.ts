import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GoogleAuthVerifyTokenDto } from '../dto/google-auth.verify-token.dto';
import { GoogleAuthVerifyService } from '../service/google-auth.verify.service';
import { GoogleAuthResponseDto } from '../dto/google-auth.response.dto';
import { GoogleAuthResponse } from '../interface/google-auth.response.interface';

@ApiForbiddenResponse({ description: 'Authorization is required' })
@ApiBadRequestResponse({ description: 'Bad request' })
@ApiTags('GoogleOauth')
@Controller({ path: 'google', version: '1' })
export class GoogleAuthHttpController {
  constructor(
    private readonly googleAuthVerifyService: GoogleAuthVerifyService,
  ) {}

  @ApiCreatedResponse({
    description: 'Google oauth response',
    type: GoogleAuthResponseDto,
  })
  @ApiBody({ type: GoogleAuthVerifyTokenDto })
  @Post()
  async verifyToken(
    @Body() googleOauthVerifyTokenDto: GoogleAuthVerifyTokenDto,
  ): Promise<GoogleAuthResponseDto> {
    const googleAuthResponse: GoogleAuthResponse =
      await this.googleAuthVerifyService.verify(
        googleOauthVerifyTokenDto.toDomain(),
      );

    return new GoogleAuthResponseDto(googleAuthResponse);
  }
}
