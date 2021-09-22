const express = require('express');
const { getBusinessUser, patchBusinessUser } = require('../controllers/businessUsers');
const businessUserRouter = express.Router();

businessUserRouter.route('/:username')
  .get(getBusinessUser)
  .patch(patchBusinessUser);

module.exports = businessUserRouter;