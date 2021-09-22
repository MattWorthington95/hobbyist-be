const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/api.router');
const connectDB = require('./db/db');
const { handle404s, handle400s, handle500s } = require('./errors');
const ENV = process.env.NODE_ENV || 'config';

dotenv.config({ path: `server/config/${ENV}.env` });
connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', apiRouter);

app.use('*', handle404s);
app.use(handle400s);

app.use(handle500s);

module.exports = app;
