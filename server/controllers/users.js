const User = require('../models/User');

exports.getUser = (req, res, next) => {
  const { username } = req.params;
  const mongoParams = {username};

  User.find(mongoParams)
    .then((user) => {
      if (user.length === 0) {
        return Promise.reject({status:400, msg: 'Sorry, that is bad request' });
      }
      else{
        res.status(200).send({ user });
      }
    })
    .catch(next);
};

exports.patchUser = (req, res, next) => {
  const { username } = req.params;
  const mongoParams = {username};
  const updates = req.body;

  User.findOneAndUpdate(mongoParams, updates, {new: true})
    .then((user) => {
      if (user.length === 0) {
        return Promise.reject({status:400, msg: 'Sorry, that is bad request' });
      }
      else {
        res.status(200).send({ user });
      }
    }).catch(next);
};