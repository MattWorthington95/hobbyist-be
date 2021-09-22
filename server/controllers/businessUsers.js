const BusinessUser = require('../models/BusinessUser');
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
      if (!businessUser) {
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

exports.postBusinessUserCreate = (req, res, next) => {};
