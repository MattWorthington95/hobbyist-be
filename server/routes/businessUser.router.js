const express = require('express');

const {
  getBusinessUser,
  patchBusinessUser,
  postBusinessUserLogin,
  postBusinessUserCreate,
  postBusinessUserClub
} = require('../controllers/businessUsers');
const businessUserRouter = express.Router();

businessUserRouter.route('/login').post(postBusinessUserLogin);
businessUserRouter.route('/create').post(postBusinessUserCreate);
businessUserRouter
  .route('/:username')
  .get(getBusinessUser)
  .patch(patchBusinessUser);
businessUserRouter.route('/:username/clubs').post(postBusinessUserClub);

module.exports = businessUserRouter;
