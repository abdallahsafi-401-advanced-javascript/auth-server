'use strict';

const mongoose = require('mongoose');

/**
 * Users schema
 */
const users = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    default: 'regular',
    enum: ['regular', 'writer', 'editor', 'admin'],
  },
});

module.exports = mongoose.model('users', users);
