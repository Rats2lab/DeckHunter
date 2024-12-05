import { INestApplication, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppNestjsModule } from './app/app.nestjs.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app: INestApplication<any> = await NestFactory.create(AppNestjsModule, {
    cors: true,
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  configureSwagger(app);

  await app.listen(app.get(ConfigService).getOrThrow('DH_APP_PORT'));
}
bootstrap();

const configureSwagger = (app: INestApplication): void => {
  const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API endpoints documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .addApiKey()
    .build();

  const api: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, api);
};
