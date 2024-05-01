import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppNestjsModule } from '../../src/app/app.nestjs.module';

describe('Example (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppNestjsModule],
    }).compile();

    //.overrideProvider().useValue();

    // repo = app.get(getRepositoryToken(Entity));
    // service = app.get(getRepositoryToken(Service));

    app = module.createNestApplication();
    //app.useLogger(app.get(Service));

    app.enableVersioning();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('E2e test', () => {
    it('Example', async () => {
      const response = await request(app.getHttpServer()).get('').query({});

      expect(response.statusCode).not.toEqual(404);
    });
  });
});
