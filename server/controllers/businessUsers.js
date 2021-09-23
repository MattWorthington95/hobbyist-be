const BusinessUser = require('../models/BusinessUser');
const { Club } = require('../models/Club');
const geocoder = require('../utils/geocoder');

exports.getBusinessUser = (req, res, next) => {
  const { username } = req.params;
  const mongoParams = { username };

  BusinessUser.find(mongoParams)
    .then((businessUser) => {
      if (businessUser.length === 0) {
        return Promise.reject({
          status: 400,
          msg: 'Sorry, that is bad request'
        });
      } else {
        res.status(200).send({ businessUser });
      }
    })
    .catch(next);
};

exports.patchBusinessUser = (req, res, next) => {
  const { username } = req.params;
  const mongoParams = { username };
  const updates = req.body;

  BusinessUser.findOneAndUpdate(mongoParams, updates, { new: true })

    .then(async (businessUser) => {
      if (!businessUser || Object.keys(updates).length === 0) {
        return Promise.reject({
          status: 400,
          msg: 'Sorry, that is bad request'
        });
      } else {
        businessUser.location = {};
        await geocoder(businessUser);
        res.status(200).send({ businessUser });
      }
    })
    .catch(next);
};

exports.postBusinessUserClub = async (req, res, next) => {
  const { username } = req.params;
  const mongoParams = { username };
  const newClubData = req.body;

  try {
    const businessUserExists = await BusinessUser.findOne(mongoParams);
    if (!businessUserExists || Object.keys(newClubData) === 0) {
      return next({
        status: 400,
        msg: 'Sorry, that is bad request'
      });
    } else {
      const businessUser = await BusinessUser.findOne(mongoParams);
      const createdClub = new Club(newClubData);

      businessUser.clubs.push(createdClub);

      await businessUser.save('done');
      await createdClub.save();

      res.status(201).send({ businessUser });
    }
  } catch (err) {
    next(err);
  }
};

exports.postBusinessUserLogin = (req, res, next) => {
  const { username, password } = req.body;

  BusinessUser.find({
    $and: [{ username }, { password }]
  }).then((user) => {
    if (user.length < 1) {
      res.status(404).send({ msg: 'incorrect username or password ' });
    } else {
      res.status(202).send({ msg: 'yes, let them in' });
    }
  });
};

exports.postBusinessUserCreate = (req, res, next) => {
  const newUserInfo = req.body;
  newUserInfo.location = {};

  BusinessUser.findOne({ username: newUserInfo.username })
    .then((user) => {
      if (user) {
        return Promise.reject({
          status: 400,
          msg: 'Sorry, user already exists'
        });
      } else {
        const newUser = new BusinessUser(newUserInfo);

        return BusinessUser.create(newUser);
      }
    })
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch(next);
};

exports.getBusinessUserByClub = (req, res, next) => {
  const { club } = req.params;

  const mongoQuery = { clubs: { $elemMatch: { clubName: club } } };

  BusinessUser.findOne(mongoQuery)
    .then((businessUser) => {
      if (!businessUser) return next({ status: 404, msg: 'Club Not Found' });
      const { name, username } = businessUser;
      res.status(200).send({ businessUser: { name, username } });
    })
    .catch(next);
};
