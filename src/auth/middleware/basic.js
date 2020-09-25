'use strict';

const base64 = require('base-64');

const users = require('../models/users/users-model.js');
/**
 * middleware to generate token when I user authorized sign in
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    next('Invalid Login');
    return;
  }

  // Pull out just the encoded part by splitting the header into an array on the space and popping off the 2nd element
  let basic = req.headers.authorization.split(' ').pop();


  // decodes to user:pass and splits it to an array
  let [user, pass] = base64.decode(basic).split(':');
  let userRecord = {
    username: user,
    password: pass,
  };

  // Is this user ok?
  users
    .authenticateBasic(userRecord)
    .then((validUser) => {
      req.token = users.generateToken(validUser);
      req.user = validUser;
      next();
    })
    .catch((err) => next('Invalid Login'));
};
