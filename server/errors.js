exports.handle404s = (req, res, next) => {
  res.status(404).send({ msg: 'Sorry, that is not found' });
};

exports.handleMongoErrors = (err, req, res, next) => {
  if (err.reason && err.reason.code === 'ERR_ASSERTION') {
    res.status(400).send({ msg: 'Incorrect data type' });
  } else {
    next(err);
  }
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handle500s = (err, req, res, next) => {
  console.log(err, '      <<<<< 500 error');

  res.status(500).send({ msg: 'Internal Server Error' });
};
