const express = require('express');
const { getUser, patchUser } = require('../controllers/users');
const { postUserLogin } = require('../controllers/user');
const userRouter = express.Router();

userRouter.route('/login').post(postUserLogin);
userRouter.route('/:username')
  .get(getUser)
  .patch(patchUser);

module.exports = userRouter;

