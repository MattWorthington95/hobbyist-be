const express = require('express');
const { getClubs } = require('../controllers/clubs');
const clubsRouter = express.Router();

clubsRouter.route('/').get(getClubs);

module.exports = clubsRouter;