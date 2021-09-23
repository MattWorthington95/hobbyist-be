const request = require('supertest');
const seedData = require('../seed/test-seed.js');
const app = require('../app.js');
const mongoose = require('mongoose');
require('jest-sorted');

jest.setTimeout(30000);

beforeEach(() => {
  return seedData();
});
afterAll(() => mongoose.connection.close());

describe('/api/suser/login', () => {
  it('201: returns a yes let them in message', async () => {
    const { body } = await request(app)
      .post('/api/users/login')
      .send({ username: 'Elias72', password: 'Tsv6Y34ISmsEx98' })
      .expect(202);
    expect(body.msg).toBe('yes, let them in');
  });
  describe('Error Handling', () => {
    it('404: returns a incorrect username or password message', async () => {
      const { body } = await request(app)
        .post('/api/users/login')
        .send({ username: 'Elias72', password: 'WrongPassword' })
        .expect(404);
      expect(body.msg).toBe('incorrect username or password ');
    });
  });
});
