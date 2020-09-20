'use strict';

/**
 * middleware that response with 500 when error acurs in the server
 * @param {*} err
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
module.exports = (err, req, res, next) => {
  res.status(500).send('Server Error!');
};
