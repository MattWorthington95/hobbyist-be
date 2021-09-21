const express = require('express');
const apiRouter = express.Router();
const clubsRouter = require('./clubs.router');

apiRouter.get('/', (req, res) => {
  res.send('hello');
});

apiRouter.use('/clubs', clubsRouter);

module.exports = apiRouter;
