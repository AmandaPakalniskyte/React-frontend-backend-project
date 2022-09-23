const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const apiRouter = require('./routers/api-router');
const authRouter = require('./routers/auth-router');

const server = express();

const { SERVER_DOMAIN, SERVER_PROTOCOL, SERVER_PORT, DB_CONNECTION, TOKEN_SECRET } = process.env;
const constantsConfiguredInEnvFile = SERVER_DOMAIN && SERVER_PROTOCOL && SERVER_PORT && DB_CONNECTION && TOKEN_SECRET;

try {
  if (!constantsConfiguredInEnvFile) {
    throw new Error('Project constants are not defined.\n\t Define constants in \'/.env\' file.');
  }

  // Middleware
  server.use(express.json());
  server.use(morgan('tiny'));
  server.use(cors());
  server.use(express.static('public'))

  // Routes
  server.use('/api', apiRouter);
  server.use('/auth', authRouter);

  mongoose.connect(DB_CONNECTION, (err) => {
    if (err) {
      throw err.message;
    }

    console.log('connected to MongoDB Atlass');
    server.listen(SERVER_PORT, (err) => {
      if (err) {
        console.error(err.message);
      }

      console.log(`server launched on ${SERVER_PROTOCOL}://${SERVER_DOMAIN}:${SERVER_PORT}`);
    });
  });

} catch (err) {
  console.error(err.message);
}
