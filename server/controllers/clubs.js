const { Club } = require('../models/Club');

exports.getClubs = (req, res, next) => {
  const mongoQuery = {};
  for (let urlQuery in req.query) {
    if (urlQuery === 'day') {
      const dayQuery = req.query[urlQuery];
      const str = `hours.${dayQuery}.open`;
      mongoQuery[str] = { $ne: null };
    } else {
      mongoQuery[urlQuery] = req.query[urlQuery];
    }
  }
  if (mongoQuery.price) {
    mongoQuery.price = { $lte: req.query.price };
  }
  console.log(mongoQuery);
  Club.find(mongoQuery)
    .then((clubs) => {
      res.status(200).send({ clubs });
    })
    .catch((err) => {
      console.log(err);
    });
};
