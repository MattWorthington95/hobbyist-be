const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/api.router');

dotenv.config({ path: 'server/config/config.env' });

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', apiRouter);

module.exports = app;
