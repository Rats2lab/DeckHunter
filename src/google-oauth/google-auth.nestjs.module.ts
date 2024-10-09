import { Module } from '@nestjs/common';
import { GoogleAuthVerifyService } from './service/google-auth.verify.service';
import { GoogleAuthHttpController } from './controller/google-auth.http.controller';
import { GoogleOauth2Repository } from './repository/google-auth.oauth2.repository';

@Module({
  controllers: [GoogleAuthHttpController],
  providers: [GoogleAuthVerifyService, GoogleOauth2Repository],
})
export class GoogleAuthNestjsModule {}
