const express = require('express');

const { getBusinessUser, patchBusinessUser } = require('../controllers/businessUsers');
const {
  postBusinessUserLogin,
  postBusinessUserCreate
} = require('../controllers/businessuser');
const businessUserRouter = express.Router();

businessUserRouter.route('/login').post(postBusinessUserLogin);
businessUserRouter.route('/create').post(postBusinessUserCreate);
businessUserRouter.route('/:username')
  .get(getBusinessUser)
  .patch(patchBusinessUser);

module.exports = businessUserRouter;

