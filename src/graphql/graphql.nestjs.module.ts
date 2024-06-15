import { Module } from '@nestjs/common';
import { GraphqlHttpRepository } from './repository/graphql.http.repository';
import { GraphqlFindService } from './service/graphql.find.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 0,
    }),
  ],
  providers: [GraphqlHttpRepository, GraphqlFindService],
  exports: [GraphqlFindService],
})
export class GraphqlNestjsModule {}
