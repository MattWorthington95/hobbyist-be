const express = require('express');
const { getUser, patchUser } = require('../controllers/users');
const userRouter = express.Router();

userRouter.route('/:username')
  .get(getUser)
  .patch(patchUser);

module.exports = userRouter;