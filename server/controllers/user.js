const User = require('../models/User');

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
