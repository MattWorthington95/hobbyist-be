const { Clubs } = require('../models/Club');

exports.getClubs = (req, res, next) => {
  Clubs.find({}).then((clubs) => {
    res.status(200).send({ clubs });
  }).catch((err) => {
    console.log(err);
  });
};

