const BusinessUser = require('../models/BusinessUser');

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
