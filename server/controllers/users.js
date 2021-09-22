const User = require('../models/User');

exports.getUser = (req, res, next) => {
  const { username } = req.params;
  const mongoParams = { username };

  User.find(mongoParams)
    .then((user) => {
      if (user.length === 0) {
        return Promise.reject({
          status: 400,
          msg: 'Sorry, that is bad request'
        });
      } else {
        res.status(200).send({ user });
      }
    })
    .catch(next);
};

exports.patchUser = (req, res, next) => {
  const { username } = req.params;
  const mongoParams = { username };
  const updates = req.body;

  User.findOneAndUpdate(mongoParams, updates, { new: true })
    .then((user) => {
      if (user.length === 0) {
        return Promise.reject({
          status: 400,
          msg: 'Sorry, that is bad request'
        });
      } else {
        res.status(200).send({ user });
      }
    })
    .catch(next);
};

exports.postUserLogin = (req, res, next) => {
  const { username, password } = req.body;
  User.find({
    $and: [{ username }, { password }]
  }).then((user) => {
    if (user.length < 1) {
      res.status(404).send({ msg: 'incorrect username or password ' });
    } else {
      res.status(202).send({ msg: 'yes, let them in' });
    }
  });
};
