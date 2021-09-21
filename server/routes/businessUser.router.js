const express = require('express');
const {
  postBusinessUserLogin,
  postBusinessUserCreate
} = require('../controllers/businessuser');
const businessUserRouter = express.Router();

businessUserRouter.route('/login').post(postBusinessUserLogin);
businessUserRouter.route('/create').post(postBusinessUserCreate);

module.exports = businessUserRouter;
