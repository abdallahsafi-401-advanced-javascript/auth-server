'use strict';
/**
 * middleware that response with 404 when the user request not found page
 * @param {object} req 
 * @param {object} res 
 */
module.exports = (req, res) => {
  res.status(404).send('404 Not Found');
};