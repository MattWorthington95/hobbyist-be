const express = require('express');
const { getBusinessUserByClub } = require('../controllers/businessUsers');
const { getClubs } = require('../controllers/clubs');
const clubsRouter = express.Router();

clubsRouter.route('/').get(getClubs);
clubsRouter.route('/:club/businessUser').get(getBusinessUserByClub);

module.exports = clubsRouter;
