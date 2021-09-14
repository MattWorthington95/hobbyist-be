const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');

dotenv.config({ path: 'server/config/config.env' });

const app = express();

app.use(cors());

app.use(express.json());

module.exports = app;
