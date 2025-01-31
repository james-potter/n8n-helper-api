import request from 'supertest';
import { app } from '../src/app';


describe('POST /v1/url/metadata', () => {
  it('should return 400 if URL parameter is missing', async () => {
    const response = await request(app)
      .post('/v1/url/metadata')
      .send({
        url: ''
      });
    expect(response.status).toBe(400);
  });

  it('should return 200 with fetched data for valid URL', async () => {
    const response = await request(app)
      .post('/v1/url/metadata')
      .send({
        url: 'https://example.com',
        readab: 'true'
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('byline');
    expect(response.body).toHaveProperty('content');
    expect(response.body).toHaveProperty('length');
    expect(response.body).toHaveProperty('excerpt');
    expect(response.body).toHaveProperty('siteName');
  });

  it('should return 200 without fetched data for valid URL', async () => {
    const response = await request(app)
      .post('/v1/url/metadata')
      .send({
        url: 'https://example.com',
        readab: 'false'
      });
    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty('title');
    expect(response.body).not.toHaveProperty('byline');
    expect(response.body).not.toHaveProperty('content');
    expect(response.body).not.toHaveProperty('length');
    expect(response.body).not.toHaveProperty('excerpt');
    expect(response.body).not.toHaveProperty('siteName');
  });

});