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

describe('/api/businessUsers/login', () => {
  it('201: returns a yes let them in message', async () => {
    const { body } = await request(app)
      .post('/api/businessUsers/login')
      .send({ username: 'Meda_Feeney56', password: 'EotYaCCiiEm1Bs8' })
      .expect(202);
    expect(body.msg).toBe('yes, let them in');
  });
  describe('Error Handling', () => {
    it('404: returns a incorrect username or password message', async () => {
      const { body } = await request(app)
        .post('/api/businessUsers/login')
        .send({ username: 'WrongUserName', password: 'EotYaCCiiEm1Bs8' })
        .expect(404);
      expect(body.msg).toBe('incorrect username or password ');
    });
  });
});

describe('/api/users/:username', () => {
  describe('/GET', () => {
    it('200: returns an array of objects representing user', async () => {
      const { body } = await request(app).get('/api/users/Elias72').expect(200);

      expect(body.user).toBeInstanceOf(Array);
      expect(body.user[0].username).toEqual('Elias72');
      expect(body.user[0]).toMatchObject({
        address: expect.any(Object),
        location: expect.any(Object),
        username: expect.any(String),
        name: expect.any(String),
        password: expect.any(String),
        imageURL: expect.any(String),
        email: expect.any(String),
        age13: expect.any(Boolean)
      });
    });
    test('Error 400: responds with an error message when passed invalid username', async () => {
      await request(app)
        .get('/api/users/notUsername')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Sorry, that is bad request');
        });
    });
  });
  describe('/PATCH', () => {
    test('PATCH 200: responds with the updates in user', async () => {
      const updates = {
        address: { firstLine: '7 King St', postcode: 'M2 4DL' },
        password: 'somehingNew9'
      };
      await request(app)
        .patch('/api/users/Elias72')
        .send(updates)
        .expect(200)
        .then(({ body }) => {
          expect(body.user).toMatchObject({
            address: { firstLine: '7 King St', postcode: 'M2 4DL' },
            location: expect.any(Object),
            username: expect.any(String),
            name: expect.any(String),
            password: 'somehingNew9',
            imageURL: expect.any(String),
            email: expect.any(String),
            age13: expect.any(Boolean)
          });
        });
    });
    test('Error 400: responds with an error message when passed invalid username', async () => {
      const updates = {
        address: { firstLine: '7 King St', postcode: 'M2 4DL' },
        password: 'somehingNew9'
      };
      await request(app)
        .patch('/api/users/notUsername')
        .send(updates)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Sorry, that is bad request');
        });
    });
    test('Error 400:  responds with an error message when malformed body/missing required fields', async () => {
      const updates = {};
      await request(app)
        .patch('/api/users/Elias72')
        .send(updates)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Sorry, that is bad request');
        });
    });
  });
});
describe('/api/businessUsers/:username', () => {
  describe('/GET', () => {
    it('200: returns an array of objects representing businessUser', async () => {
      const { body } = await request(app)
        .get('/api/businessUsers/Meda_Feeney56')
        .expect(200);

      expect(body.businessUser).toBeInstanceOf(Array);
      expect(body.businessUser[0].username).toEqual('Meda_Feeney56');
      expect(body.businessUser[0]).toMatchObject({
        address: expect.any(Object),
        location: expect.any(Object),
        username: expect.any(String),
        email: expect.any(String),
        phoneNumber: expect.any(Number),
        password: expect.any(String),
        website: expect.any(String),
        name: expect.any(String),
        imageURL: expect.any(String),
        clubs: expect.any(Array),
        reviews: expect.any(Array)
      });
    });
    test('Error 400: responds with an error message when passed invalid username', async () => {
      await request(app)
        .get('/api/businessUsers/notUsername')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Sorry, that is bad request');
        });
    });
  });
  describe('/PATCH', () => {
    test('PATCH 200: responds with the updates in businessUser', async () => {
      const updates = {
        email: 'Meda_Feeney56@hotmail.com',
        phoneNumber: 7234543654,
        password: 'somehingNew9'
      };
      await request(app)
        .patch('/api/businessUsers/Meda_Feeney56')
        .send(updates)
        .expect(200)
        .then(({ body }) => {
          expect(body.businessUser).toMatchObject({
            address: expect.any(Object),
            location: expect.any(Object),
            username: expect.any(String),
            email: 'Meda_Feeney56@hotmail.com',
            phoneNumber: 7234543654,
            password: 'somehingNew9',
            website: expect.any(String),
            name: expect.any(String),
            imageURL: expect.any(String),
            clubs: expect.any(Array),
            reviews: expect.any(Array)
          });
        });
    });
    it('200: should automatically update the location data when updated with a new address', async () => {
      const updates = {
        address: {
          firstLine: '52 Church Street',
          postcode: 'M4 1PN'
        }
      };

      const { body } = await request(app)
        .patch('/api/businessUsers/Meda_Feeney56')
        .send(updates)
        .expect(200);

      expect(body.businessUser.location).toEqual({
        type: 'Point',
        coordinates: [53.4829818, -2.2374746],
        formattedAddress:
          'Church Street, Northern Quarter, City Centre, Manchester, Greater Manchester, North West England, England, M4 1PN, United Kingdom'
      });
    });
    test('Error 400: responds with an error message when passed invalid username', async () => {
      const updates = {
        email: 'Meda_Feeney56@hotmail.com',
        phoneNumber: 7234543654,
        password: 'somehingNew9'
      };
      await request(app)
        .patch('/api/businessUsers/notUsername')
        .send(updates)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Sorry, that is bad request');
        });
    });
    test('Error 400:  responds with an error message when malformed body/missing required fields', async () => {
      const updates = {};
      await request(app)
        .patch('/api/businessUsers/Meda_Feeney56')
        .send(updates)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Sorry, that is bad request');
        });
    });
  });
});

describe('/api/users/:username', () => {
  describe('POST club', () => {
    test('POST 201: responds with club added to database by username', async () => {
      const newClubData = {
        clubName: 'Music Group',
        email: 'music.group@yahoo.com',
        ageGroup: 'toddler',
        level: 'all levels',
        price: 10,
        address: { firstLine: '2 Booth St E', postcode: 'M13 9SS' },
        clubType: 'music',
        description:
          'Quidem libero omnis fugiat est consectetur deleniti et. Eaque aut dolo...'
      };
      return await request(app)
        .post('/api/businessUsers/Meda_Feeney56/clubs')
        .send(newClubData)
        .expect(201)
        .then(({ body }) => {
          const { businessUser } = body;
          expect(businessUser.clubs[1]).toMatchObject({
            clubName: 'Music Group',
            email: 'music.group@yahoo.com',
            ageGroup: 'toddler',
            level: 'all levels',
            price: 10,
            address: { firstLine: '2 Booth St E', postcode: 'M13 9SS' },
            clubType: 'music',
            description:
              'Quidem libero omnis fugiat est consectetur deleniti et. Eaque aut dolo...'
          });
        });
    });
    test('Error 400: responds with an error message when passed invalid username', async () => {
      const newClubData = {};
      return await request(app)
        .post('/api/businessUsers/notUser/clubs')
        .send(newClubData)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Sorry, that is bad request');
        });
    });
  });
});
