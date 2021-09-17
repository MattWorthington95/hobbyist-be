const faker = require('faker/locale/en_GB');
const BusinessUser = require('../models/BusinessUser');
const User = require('../models/User');
const { Club } = require('../models/Club');
const { randomiseHours } = require('../utils/utils');
require('../app');

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

const seedClubs = async () => {
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
      address: {
        buildingNumber: faker.datatype.number(300),
        postcode: faker.address.zipCode()
      },
      website: faker.internet.url(),
      clubType: faker.helpers.randomize(['sport', 'art', 'music', 'other']),
      description: faker.lorem.paragraph(),
      hours: randomiseHours()
    });
    await Club.create(newClub);
    return newClub;
  } catch (err) {
    console.log(err);
  }
};

const seedBusinessUsers = async () => {
  const addresses = [
    { firstLine: '2 Booth St E', postcode: 'M13 9SS' },
    { firstLine: 'Moss Ln E', postcode: 'M15 5NN' },
    { firstLine: 'Great Cheetham St W', postcode: 'M7 2DN' }
  ];
  try {
    const businessUsers = [];

    for (let i = 0; i < 3; i++) {
      const clubData = await seedClubs();
      businessUsers.push(
        new BusinessUser({
          username: faker.internet.userName(),
          email: faker.internet.email(),
          phoneNumber: faker.phone.phoneNumber('07#########'),
          password: faker.internet.password(),
          website: faker.internet.url(),
          name: faker.company.companyName(),
          address: {
            firstLine: `${addresses[i].firstLine} ${addresses[i].postcode}`,
            postcode: addresses[i].postcode
          },
          location: {
            type: 'Point',
            coorditates: []
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
    await businessUsers.forEach((businessUser) => {
      BusinessUser.create(businessUser);
    });
    console.log('Saved!');
    console.log(businessUsers);
  } catch (err) {
    console.log(err);
  }
};
seedBusinessUsers();
seedUsers();
