const faker = require('faker/locale/en_GB');
const BusinessUser = require('../models/BusinessUser');
const User = require('../models/User');
const { Club } = require('../models/Club');
const { randomiseHours } = require('../utils/utils');
const { clubAddresses } = require('../db/data/addresses');
require('../app');

/**
 * Function to prevent 429 Error -
 *  too many requests per second from OpenStreetMaps API
 * @param {Number} ms time in milliseconds
 * @returns {Promise} that resolves after a setTimeout
 */
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const seedUsers = async () => {
  try {
    const users = [];
    for (let i = 0; i < 10; i++) {
      users.push(
        new User({
          username: faker.internet.userName(),
          name: faker.name.findName(),
          password: faker.internet.password(),
          address: {
            buildingNumber: faker.datatype.number(300),
            postcode: faker.address.zipCode()
          },
          imageURL: faker.internet.avatar(),
          email: faker.internet.email(),
          age13: faker.datatype.boolean()
        })
      );
    }
    users.forEach((user) => {
      User.create(user);
    });
    console.log('Saved!');
  } catch (error) {
    console.log(error);
  }
};

const seedClubs = async (clubAddress) => {
  const ageGroupArray = [
    'toddler',
    'pre-school',
    'primary-school',
    'secondary',
    'young adult',
    'adult'
  ];

  const levelArray = ['beginner', 'intermediate', 'advanced', 'all levels'];

  try {
    const newClub = await new Club({
      clubName: faker.company.companyName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.phoneNumber('07#########'),
      ageGroup: faker.helpers.randomize(ageGroupArray),
      level: faker.helpers.randomize(levelArray),
      price: faker.commerce.price(0, 30, 2),
      address: clubAddress,
      location: {
        type: 'Point'
      },
      website: faker.internet.url(),
      clubType: faker.helpers.randomize(['sport', 'art', 'music', 'other']),
      description: faker.lorem.paragraph(),
      hours: randomiseHours()
    });
    await Promise.all([sleep(1000), Club.create(newClub)]);
    return newClub;
  } catch (err) {
    console.log(err);
  }
};

const seedBusinessUsers = async () => {
  try {
    const businessUsers = [];

    for (let clubAddress of clubAddresses) {
      const clubData = await seedClubs(clubAddress);
      businessUsers.push(
        new BusinessUser({
          username: faker.internet.userName(),
          email: faker.internet.email(),
          phoneNumber: faker.phone.phoneNumber('07#########'),
          password: faker.internet.password(),
          website: faker.internet.url(),
          name: faker.company.companyName(),
          address: clubAddress,
          location: {
            type: 'Point'
          },
          imageURL: faker.internet.avatar(),
          clubs: [clubData],
          reviews: [
            {
              username: faker.internet.userName(),
              body: faker.lorem.paragraph()
            },
            {
              username: faker.internet.userName(),
              body: faker.lorem.paragraph()
            }
          ]
        })
      );
    }
    // using for loop instead of forEach to enable use of async/await
    for (let businessUser of businessUsers) {
      await Promise.all([sleep(1000), BusinessUser.create(businessUser)]);
      console.log('Saved business users');
    }
  } catch (err) {
    console.log(err);
  }
};
seedBusinessUsers();
seedUsers();
