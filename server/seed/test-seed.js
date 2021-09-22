const BusinessUser = require('../models/BusinessUser');
const User = require('../models/User');
const { Club } = require('../models/Club');
require('../app');
const testUsers = require('../db/testData/users.json');
const testBusinessUsers = require('../db/testData/businessUsers.json');

const seedUsers = async () => {
  try {
    const users = [];
    users.push(new User(testUsers[0]));
    for (let user of users) {
      await Promise.all([User.create(user)]);
    }
  } catch (error) {
    console.log(error);
  }
};

const seedClubs = async (club) => {
  try {
    const newClub = await new Club(club);
    await Promise.all([Club.create(newClub)]);
    return newClub;
  } catch (err) {
    console.log(err);
  }
};

const seedBusinessUsers = async () => {
  try {
    const businessUsers = [];

    for (let businessUser of testBusinessUsers) {
      await seedClubs(businessUser.clubs[0]);
      businessUsers.push(new BusinessUser(businessUser));
    }
    // using for loop instead of forEach to enable use of async/await
    for (let businessUser of businessUsers) {
      await Promise.all([BusinessUser.create(businessUser)]);
    }
  } catch (err) {
    console.log(err);
  }
};

const seedData = async () => {
  await BusinessUser.deleteMany();
  await User.deleteMany();
  await Club.deleteMany();

  const businessUserResponse = await seedBusinessUsers();
  const userResponse = await seedUsers();
  return [businessUserResponse, userResponse];
};

module.exports = seedData;
