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

describe('/not-a-path', () => {
  it('404: responds with a msg of "Sorry, that is not found" when entered an incorrect path', async () => {
    const { body } = await request(app).get('/not-a-path').expect(404);

    expect(body.msg).toBe('Sorry, that is not found');
  });
});
describe('/api/clubs', () => {
  describe('/GET', () => {
    it('200: returns an array of objects representing each club', async () => {
      const { body } = await request(app).get('/api/clubs').expect(200);

      expect(body.clubs).toBeInstanceOf(Array);
      expect(body.clubs).toHaveLength(5);
      body.clubs.forEach((club) => {
        expect(club).toMatchObject({
          clubName: expect.any(String),
          email: expect.any(String),
          phoneNumber: expect.any(Number),
          ageGroup: expect.any(String),
          level: expect.any(String),
          price: expect.any(Number),
          website: expect.any(String),
          address: expect.any(Object),
          location: expect.any(Object),
          clubType: expect.any(String),
          description: expect.any(String),
          hours: expect.any(Object)
        });
      });
    });
    it('200: can optionally filter by age group with a valid age group', async () => {
      const { body } = await request(app)
        .get('/api/clubs?ageGroup=adult')
        .expect(200);

      expect(body.clubs).toHaveLength(2);
    });
    it('200: can optionally filter by level with a valid level query', async () => {
      const { body } = await request(app)
        .get('/api/clubs?level=all levels')
        .expect(200);

      expect(body.clubs).toHaveLength(3);
    });
    it('200: can optionally filter by maximum price with a valid price', async () => {
      const { body } = await request(app)
        .get('/api/clubs?price=20')
        .expect(200);

      expect(body.clubs).toHaveLength(3);
    });
    it('200: can optionally filter by days with a valid day', async () => {
      const { body } = await request(app)
        .get('/api/clubs?day=friday')
        .expect(200);

      expect(body.clubs).toHaveLength(2);
    });
  });
});
