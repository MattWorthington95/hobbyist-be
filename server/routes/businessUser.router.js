const express = require('express');

const {
  getBusinessUser,
  patchBusinessUser,
  postBusinessUserLogin,
  postBusinessUserCreate
} = require('../controllers/businessUsers');
const businessUserRouter = express.Router();

businessUserRouter.route('/login').post(postBusinessUserLogin);
businessUserRouter.route('/create').post(postBusinessUserCreate);
businessUserRouter
  .route('/:username')
  .get(getBusinessUser)
  .patch(patchBusinessUser);

module.exports = businessUserRouter;
