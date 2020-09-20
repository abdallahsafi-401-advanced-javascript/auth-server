'use strict';

const serverModule = require('./src/server.js');
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
mongoose.connect(MONGODB_URI, mongooseOptions);

serverModule.start();
