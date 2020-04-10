// modules for server
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// configure dotenv
require('dotenv').config();

// server configurations
const serverConfigs = require('./config/serverConfig');

// connect to database
mongoose.connect(serverConfigs.DBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// initialize express
const app = express();

// apply express configs
require('./backend/express')(app, serverConfigs);

// fire up the server
app.listen(serverConfigs.PORT, (error) => {
  if (error) throw error;
  console.log('Server running on port: ' + serverConfigs.PORT);
});
