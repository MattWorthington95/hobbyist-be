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
  });
});
