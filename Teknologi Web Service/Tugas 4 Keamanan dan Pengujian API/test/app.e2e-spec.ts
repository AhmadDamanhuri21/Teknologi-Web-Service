import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('API Security (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET) should return Hello World', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('POST /auth/register should register a new user', async () => {
    const email = `e2e${Date.now()}@gmail.com`;

    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        nama: 'User E2E',
        email,
        password: 'password123',
      })
      .expect(201)
      .expect((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body.nama).toBe('User E2E');
        expect(response.body.email).toBe(email);
        expect(response.body.role).toBe('wisatawan');
        expect(response.body).not.toHaveProperty('password');
      });
  });

  it('POST /auth/login should reject wrong password', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'ahmad@gmail.com',
        password: 'password-salah',
      })
      .expect(401);
  });

  it('POST /destinasi should reject request without JWT', () => {
    return request(app.getHttpServer())
      .post('/destinasi')
      .send({
        nama: 'E2E Test',
        kategori: 'Pantai',
        hargaTiket: 10000,
      })
      .expect(401);
  });

  it('POST /destinasi should reject invalid JWT', () => {
    return request(app.getHttpServer())
      .post('/destinasi')
      .set('Authorization', 'Bearer token-palsu-123')
      .send({
        nama: 'E2E Test',
        kategori: 'Pantai',
        hargaTiket: 10000,
      })
      .expect(401);
  });
});