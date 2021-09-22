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

describe('/api/businessuser/login', () => {
  it('201: returns a yes let them in message', async () => {
    const { body } = await request(app)
      .post('/api/businessuser/login')
      .send({ username: 'Meda_Feeney56', password: 'EotYaCCiiEm1Bs8' })
      .expect(202);
    expect(body.msg).toBe('yes, let them in');
  });
  describe('Error Handling', () => {
    it('404: returns a incorrect username or password message', async () => {
      const { body } = await request(app)
        .post('/api/businessuser/login')
        .send({ username: 'WrongUserName', password: 'EotYaCCiiEm1Bs8' })
        .expect(404);
      expect(body.msg).toBe('incorrect username or password ');
    });
  });
});
describe('/api/businessuser/create', () => {
  // it('201:', async () => {
  //   const { body } = await request(app).get('/not-a-path').expect(404);
  //   expect(body.msg).toBe('Sorry, that is not found');
  // });
});
