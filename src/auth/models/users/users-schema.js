'use strict';

const mongoose = require('mongoose');

/**
 * Users schema
 */
const users = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

users.methods.comparePassword =  function () {

};

module.exports = mongoose.model('users', users);
