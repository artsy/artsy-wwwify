const app = require('../server');
const request = require('supertest');

describe('artsy-wwwify', () => {
  afterAll((done) => {
    app.close(done);
  });

  it('redirects other requests', async () => {
    const res = await request(app).get('/artist/yayoi-kusama');
    expect(res.statusCode).toEqual(301);
    expect(res.headers).toHaveProperty('location', 'https://www.artsy.net/artist/yayoi-kusama');
  });

  it('respects querystrings when redirecting', async () => {
    const res = await request(app).get('/artist/yayoi-kusama?utm-campaign=yolo');
    expect(res.statusCode).toEqual(301);
    expect(res.headers).toHaveProperty('location', 'https://www.artsy.net/artist/yayoi-kusama?utm-campaign=yolo');
  });
});
