'use strict';

const users = require('../auth/models/users/users-model.js');

/**
 * Callback for adding controll to the next middlware.
 *
 * @callback next
 * @param {*} [error] - An integer.
 */

/**
 * this function will get the request params and determine which model that
 * the user requested
 * @param {object} req 
 * @param {object} res 
 * @param {next} callback - A callback to run.
 */

function getModel(req, res, next) {
  let model = req.params.model;
  switch (model) {
  case 'users':
    req.model = users;
    next();
    return;
  default:
    next('Invalid Model');
    return;
  }
}

module.exports.getModel = getModel;
