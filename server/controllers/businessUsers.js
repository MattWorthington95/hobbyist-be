const BusinessUser = require('../models/BusinessUser');

exports.getBusinessUser = (req, res, next) => {
  const { username } = req.params;
  const mongoParams = {username};

  BusinessUser.find(mongoParams)
    .then((businessUser) => {
      if (businessUser.length === 0) {
        return Promise.reject({status:400, msg: 'Sorry, that is bad request' });
      }
      else {
        res.status(200).send({ businessUser });
      }
    })
    .catch(next);
};

exports.patchBusinessUser = (req, res, next) => {
  const { username } = req.params;
  const mongoParams = {username};
  const updates = req.body;

  BusinessUser.findOneAndUpdate(mongoParams, updates, {new: true})
    .then((businessUser) => {
      if (businessUser.length === 0) {
        return Promise.reject({status:400, msg: 'Sorry, that is bad request' });
      }
      else {
        res.status(200).send({ businessUser });
      }
    }).catch(next);
};
