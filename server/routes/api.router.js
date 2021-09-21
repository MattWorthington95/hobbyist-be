const express = require('express');
const apiRouter = express.Router();
const clubsRouter = require('./clubs.router');
const businessUserRouter = require('./businessUser.router');
const userRouter = require('./user.router');

apiRouter.get('/', (req, res) => {
  res.send('hello');
});

apiRouter.use('/clubs', clubsRouter);

apiRouter.use('/businessuser', businessUserRouter);

apiRouter.use('/user', userRouter);

module.exports = apiRouter;
