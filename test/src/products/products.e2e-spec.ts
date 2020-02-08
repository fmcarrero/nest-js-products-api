import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { GenericContainer, Wait } from 'testcontainers';
import AppModule from '../../../src/app.module';

const fs = require('fs');

describe('ProductsController (e2e)', () => {
  let app: INestApplication;
  let container;
  const portMongo = 27017;
  jest.setTimeout(30000);

  beforeAll(async done => {
    container = await new GenericContainer('mongo')
      .withExposedPorts(portMongo)
      .withWaitStrategy(Wait.forLogMessage('Listening on 0.0.0.0'))
      .start();
    done();
  });

  afterAll(async done => {
    container.stop();
    done();
  });

  beforeEach(async done => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule.foorRoot({ port: container.getMappedPort(portMongo) }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    done();
  });

  it('/ (Post)', async done => {
    const rawdata = fs.readFileSync(`${__dirname}/example.json`);

    const response = await request(app.getHttpServer())
      .post('/products/')
      .send(JSON.parse(rawdata));

    expect(response.status).toBe(201);
    expect(response.body.id).not.toBeNull();
    expect(response.body.price).toBe(1000);
    done();
  });
});
