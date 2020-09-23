'use strict';


const users = require('../models/users/users-model.js');
/**
 * middleware to check if the user have the Privileges to the recourse 
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
module.exports = (action) => {
  return (req, res, next) => {
    let permission = users.hasPermission(req.user.role, action);
    try {
      if (permission) {
        next();
      } else {
        next('Invalid Action! ');
      }
    } catch (e) {
      next('Invalid!');
    }
  };
};
