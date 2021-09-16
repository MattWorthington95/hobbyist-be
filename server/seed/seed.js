const faker = require('faker');
const User = require('../models/User');
const App = require('../app');

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
            postcode: 'M4 7BH'
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

seedUsers();
