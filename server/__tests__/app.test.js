const request = require('supertest');
const seedData = require('../seed/test-seed.js');
const app = require('../app.js');
const mongoose = require('mongoose');
require('jest-sorted');

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
      body.clubs.forEach((club) => {
        expect(club.ageGroup).toBe('adult');
      });
    });
    it('200: can optionally filter by level with a valid level query', async () => {
      const { body } = await request(app)
        .get('/api/clubs?level=all levels')
        .expect(200);

      expect(body.clubs).toHaveLength(3);
      body.clubs.forEach((club) => {
        expect(club.level).toBe('all levels');
      });
    });
    it('200: can optionally filter by maximum price with a valid price', async () => {
      const { body } = await request(app)
        .get('/api/clubs?price=20')
        .expect(200);

      expect(body.clubs).toHaveLength(3);
      body.clubs.forEach((club) => {
        expect(club.price).toBeLessThan(20);
      });
    });
    it('200: can optionally filter by days with a valid day', async () => {
      const { body } = await request(app)
        .get('/api/clubs?day=friday')
        .expect(200);

      expect(body.clubs).toHaveLength(2);
      body.clubs.forEach((club) => {
        expect(club.hours.friday).toMatchObject({
          open: expect.any(Number),
          close: expect.any(Number)
        });
      });
    });
    it('200: can optionally filter by clubType with a valid clubType', async () => {
      const { body } = await request(app)
        .get('/api/clubs?clubType=art')
        .expect(200);

      expect(body.clubs).toHaveLength(2);
      body.clubs.forEach((club) => {
        expect(club.clubType).toBe('art');
      });
    });
    it('200: responds with an empty array if there are no results found in specific query', async () => {
      const { body } = await request(app).get('/api/clubs?price=1').expect(200);

      expect(body.clubs).toHaveLength(0);
    });
    it('200: responds with correctly filtered array when more than one filter query is passed', async () => {
      const { body } = await request(app)
        .get('/api/clubs?price=20&level=all levels')
        .expect(200);

      expect(body.clubs).toHaveLength(2);
      body.clubs.forEach((club) => {
        expect(club.price).toBeLessThan(20);
        expect(club.level).toBe('all levels');
      });
    });
    it('400: responds with a bad request message when value passed in as price query is not a number', async () => {
      const { body } = await request(app)
        .get('/api/clubs?price=friday')
        .expect(400);

      expect(body.msg).toBe('Incorrect data type');
    });
    it('400: responds with a bad request message when value passed in as price query is a negative number', async () => {
      const { body } = await request(app)
        .get('/api/clubs?price=-10')
        .expect(400);

      expect(body.msg).toBe('Price cannot be a negative number');
    });
    it('400: responds with a bad request message when value passed in as day query is invalid', async () => {
      const { body } = await request(app)
        .get('/api/clubs?day=funday')
        .expect(400);

      expect(body.msg).toBe('Invalid day value');
    });
    it('400: responds with a bad request message when value passed in as clubType query is invalid', async () => {
      const { body } = await request(app)
        .get('/api/clubs?clubType=reading')
        .expect(400);

      expect(body.msg).toBe('Invalid club type');
    });
    it('400: responds with a bad request message when value passed in as ageGroup query is invalid', async () => {
      const { body } = await request(app)
        .get('/api/clubs?ageGroup=eternal')
        .expect(400);

      expect(body.msg).toBe('Invalid age group');
    });
    it('400: responds with a bad request message when value passed in as level query is invalid', async () => {
      const { body } = await request(app)
        .get('/api/clubs?level=master')
        .expect(400);

      expect(body.msg).toBe('Invalid level');
    });
  });
});
describe('/api/businessuser/create', () => {
  it('201: created an account', async () => {
    const { body } = await request(app)
      .post('/api/businessuser/create')
      .send({
        username: 'Username1',
        email: 'Email@provider.com',
        phoneNumber: '07234567891',
        password: 'Password1',
        website: 'www.website1.com',
        name: 'Example',
        address: {
          firstLine: '52 Church Street',
          postcode: 'M4 1PN'
        },
        imageURL:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2670&q=80',
        clubs: [],
        reviews: []
      })
      .expect(201);
    expect(body.user).toMatchObject({
      address: { firstLine: '52 Church Street', postcode: 'M4 1PN' },
      location: {
        type: 'Point',
        coordinates: [53.4829818, -2.2374746],
        formattedAddress:
          'Church Street, Northern Quarter, City Centre, Manchester, Greater Manchester, North West England, England, M4 1PN, United Kingdom'
      },
      _id: expect.any(String),
      username: 'Username1',
      email: 'Email@provider.com',
      phoneNumber: 7234567891,
      password: 'Password1',
      website: 'www.website1.com',
      name: 'Example',
      imageURL:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2670&q=80',
      clubs: [],
      reviews: []
    });
  });
  it('201: still creates a user even if address data is not found by location API', async () => {
    const { body } = await request(app)
      .post('/api/businessuser/create')
      .send({
        username: 'Username1',
        email: 'Email@provider.com',
        phoneNumber: '07234567891',
        password: 'Password1',
        website: 'www.website1.com',
        name: 'Example',
        address: {
          firstLine: '72 Rainbow Road',
          postcode: 'M4 RS1'
        },
        imageURL:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2670&q=80',
        clubs: [],
        reviews: []
      })
      .expect(201);
    expect(body.user).toMatchObject({
      address: {
        firstLine: '72 Rainbow Road',
        postcode: 'M4 RS1'
      },
      location: {
        type: 'Point',
        coordinates: [],
        formattedAddress: 'None'
      },
      _id: expect.any(String),
      username: 'Username1',
      email: 'Email@provider.com',
      phoneNumber: 7234567891,
      password: 'Password1',
      website: 'www.website1.com',
      name: 'Example',
      imageURL:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2670&q=80',
      clubs: [],
      reviews: []
    });
  });
  it('400: it should send a bad request error if trying to post a username which already exists', async () => {
    const { body } = await request(app)
      .post('/api/businessuser/create')
      .send({
        username: 'Garnet23',
        email: 'Email@provider.com',
        phoneNumber: '07234567891',
        password: 'Password1',
        website: 'www.website1.com',
        name: 'Example',
        address: {
          firstLine: '52 Church Street',
          postcode: 'M4 1PN'
        },
        imageURL:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2670&q=80',
        clubs: [],
        reviews: []
      })
      .expect(400);

    expect(body.msg).toBe('Sorry, user already exists');
  });
  it('400: it should send a bad request error if trying to post without all required details', async () => {
    const { body } = await request(app)
      .post('/api/businessuser/create')
      .send({
        username: 'Username1',
        phoneNumber: '07234567891',
        password: 'Password1',
        website: 'www.website1.com',
        name: 'Example',
        address: {
          firstLine: '52 Church Street',
          postcode: 'M4 1PN'
        },
        imageURL:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2670&q=80',
        clubs: [],
        reviews: []
      })
      .expect(400);

    expect(body.msg).toBe('email validation failed');
  });
  it('400: it should send a bad request error if trying to post with invalid details', async () => {
    const { body } = await request(app)
      .post('/api/businessuser/create')
      .send({
        username: 'Username1',
        phoneNumber: 'fkjghdkfjn',
        email: 'Email@provider.com',
        password: 'Password1',
        website: 'www.website1.com',
        name: 'Example',
        address: {
          firstLine: '52 Church Street',
          postcode: 'M4 1PN'
        },
        imageURL:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2670&q=80',
        clubs: [],
        reviews: []
      })
      .expect(400);

    expect(body.msg).toBe('phoneNumber validation failed');
  });
  it('400: it should send a bad request error if trying to post with invalid details', async () => {
    const { body } = await request(app)
      .post('/api/businessuser/create')
      .send({
        username: 'Username1',
        phoneNumber: '07293559628',
        email: 'Email@provider.com',
        password: 'Password1',
        website: {},
        name: 'Example',
        address: {
          firstLine: '52 Church Street',
          postcode: 'M4 1PN'
        },
        imageURL:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2670&q=80',
        clubs: [],
        reviews: []
      })
      .expect(400);

    expect(body.msg).toBe('website validation failed');
  });
});
