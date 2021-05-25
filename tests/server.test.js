const app = require('../server');
const request = require('supertest');

describe('artsy-wwwify', () => {
  afterAll((done) => {
    app.close(done);
  });

  it('serves Apple site association file at /.well-known/...', async () => {
    const res = await request(app).get('/.well-known/apple-app-site-association');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('23KMWZ572J.net.artsy.artsy');
  });

  it('serves Apple site association file at root', async () => {
    const res = await request(app).get('/apple-app-site-association');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('23KMWZ572J.net.artsy.artsy');
  });

  it('serves Apple sign in verification file at /.well-known/...', async () => {
    const res = await request(app).get('/.well-known/apple-developer-domain-association.txt');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('MIIP1gYJKoZIhvcNAQ');
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

  it('serves Android assetlinks file at root', async () => {
    const res = await request(app).get('/.well-known/assetlinks.json');
    expect(res.statusCode).toEqual(200);
    expect(res.headers["content-type"]).toEqual('application/json');
    expect(res.body[0].target.package_name).toEqual('net.artsy.app');
    expect(res.body[0].target.namespace).toEqual('android_app');
  });
});
