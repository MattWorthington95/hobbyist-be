exports.handle404s = (req, res, next) => {
  res.status(404).send({ msg: 'Sorry, that is not found' });
};
