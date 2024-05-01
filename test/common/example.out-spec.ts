import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppNestjsModule } from '../../src/app/app.nestjs.module';

describe('Example (External)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppNestjsModule],
    }).compile();

    app = module.createNestApplication();

    app.enableVersioning();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('External test', () => {
    it('Example', async () => {
      const response = await request('https://google.es').get('').query({});

      expect(response.statusCode).not.toEqual(404);
    });
  });
});
