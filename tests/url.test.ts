import request from 'supertest';
import { app } from '../src/app';

describe('GET /v1/url/fetch', () => {
  it('should return 400 if URL parameter is missing', async () => {
    const response = await request(app).get('/v1/url/fetch');
    expect(response.status).toBe(400);
  });

  it('should return 200 with fetched data for valid URL', async () => {
    const response = await request(app).get('/v1/url/fetch?url=https://example.com');
    expect(response.status).toBe(200);
  });

  it('should return 500 for invalid URL', async () => {
    const response = await request(app).get('/v1/url/fetch?url=https://invalid.com');
    expect(response.status).toBe(500);
  });

  it('should return 400 URL parameter is required', async () => {
    const response = await request(app).get('/v1/url/fetch');
    expect(response.status).toBe(400);
  });

});

describe('POST /v1/url/fetch', () => {
  it('should return 400 if URL parameter is missing', async () => {
    const response = await request(app)
      .post('/v1/url/fetch')
      .send({
        url: ''
      });
    expect(response.status).toBe(400);
  });

  it('should return 200 with fetched data for valid URL', async () => {
    const response = await request(app)
      .post('/v1/url/fetch')
      .send({
        url: 'https://example.com'
      });
    expect(response.status).toBe(200);
  });

  it('should return 500 for invalid URL', async () => {
    const response = await request(app)
    .post('/v1/url/fetch')
    .send({
      url: 'https://invalid.com'
    });
    expect(response.status).toBe(500);
  });

  it('should return 400 URL parameter is required', async () => {
    const response = await request(app)
    .post('/v1/url/fetch');
    expect(response.status).toBe(400);
  });

});