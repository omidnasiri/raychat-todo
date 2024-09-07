import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
  });

  afterAll(async () => {
    if (connection.readyState === 1) {
      await connection.db.dropDatabase();
    } else {
      console.log('Mongoose connection is not ready.');
    }
    await connection.close();
  }, 3000);

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    connection = app.get(getConnectionToken());
  });

  it('/users (POST)', () => {
    const newUser = { username: 'sample username', password: 'sample-password' };
    return request(app.getHttpServer())
      .post('/users')
      .send(newUser)
      .expect(201)
      .expect((res) => {
        expect(res.body).toStrictEqual({
          id: expect.any(String),
          username: newUser.username,
        });
      });
  });

  it('/users (POST) - duplicate user', async () => {
    const duplicatedUser = { username: 'sample username', password: 'sample-password' };
    await request(app.getHttpServer())
      .post('/users')
      .send(duplicatedUser)
      .expect(409)
      .expect((res) => {
        expect(res.body).toStrictEqual({
          message: "Conflict",
          statusCode: 409,
        });
      });
  });
});
