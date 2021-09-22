const express = require('express');
const { postUserLogin } = require('../controllers/user');
const userRouter = express.Router();

userRouter.route('/login').post(postUserLogin);

module.exports = userRouter;
