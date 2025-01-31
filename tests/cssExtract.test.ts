import request from 'supertest';
import { app } from '../src/app';


describe('POST /v1/url/cssextract', () => {

  it('should return 200 and it should fetch at least one css entry block with a title', async () => {
    const response = await request(app)
      .post('/v1/url/cssextract')
      .send({
        url: 'https://wordpress.org/',
        cssClass: '.wp-block-columns',
        selectors: {
            title: ".wp-block-heading"
        }
      });
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.items)).toBe(true); // ✅ Ensure 'items' is an array
    expect(response.body.items.length).toBeGreaterThan(1); // ✅ Ensure 'items' has more than 1 element
  });

  it('should return 500 invalid json', async () => {
    const response = await request(app)
      .post('/v1/url/cssextract')
      .send({
        url: 'https://wordpress.org/',
        cssClass: '.wp-block-columns',
        selectors: "TEST"
      });

    expect(response.status).toBe(500);
  });

  it('should return 500 invalid url', async () => {
    const response = await request(app)
      .post('/v1/url/cssextract')
      .send({
        url: 'https://invalid.com',
        cssClass: '.wp-block-columns',
        selectors: {
            title: ".entry-title"
        }
      });
    expect(response.status).toBe(500);
  });

});