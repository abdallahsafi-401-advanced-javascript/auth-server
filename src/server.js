'use strict';

const express = require('express');
const app = express();
require('dotenv').config('.env');
const cors = require('cors');
const morgan = require('morgan');

// ------------  middleware ------------

// Global MiddleWare
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes middleware
const status404 = require('./middleware/404.js');
const status500 = require('./middleware/500.js');
const router = require('./auth/router.js');

//Routes
app.use('/', router);
// ---------------------------

//test the server error
app.get('/bad', (req, res) => {
  throw new Error('bad Request');
});

// 404 page not found
app.use('*', status404);
// 500 server error
app.use(status500);

module.exports = {
  server: app,
  start: (port) => {
    let PORT = port || process.env.port || 3000;
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  },
};
