const { Club } = require('../models/Club');

exports.getClubs = (req, res, next) => {
  Club.find({})
    .then((clubs) => {
      res.status(200).send({ clubs });
    })
    .catch((err) => {
      console.log(err);
    });
};
