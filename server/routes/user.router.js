const express = require('express');
const { getUser, patchUser, postUserLogin } = require('../controllers/users');
const userRouter = express.Router();

userRouter.route('/login').post(postUserLogin);
userRouter.route('/:username').get(getUser).patch(patchUser);

module.exports = userRouter;
