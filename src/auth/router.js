'use strict';

const express = require('express');
const router = express.Router();
const basicAuth = require('./middleware/basic.js');
const modelFinder = require('../middleware/model-finder.js');
const users = require('./models/users/users-model.js');


router.param('model', modelFinder.getModel);

//------------- Routes -----------

// signup
router.post('/signup', handelSignUp);

// signin
router.post('/signin', basicAuth, handelSignIn);

// get all users
router.get('/:model', handelGetAll);

//------------- Handlers -----------

/**
 * handeling the signup post request
 * @param {object} req
 * @param {object} res
 */
async function handelSignUp(req, res) {
  let model = req.body;
  try {
    let modelRet = await users.create(model);
    res.status(200).json(modelRet);
  } catch (err) {
    console.log('err', err);
  }
}

/**
 * handeling the user signin request 
 * @param {object} res
 */
function handelSignIn(req, res) {
  res
    .cookie('token', req.token, {
      expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
    })
    .set('token', req.token)
    .json({
      token: req.token,
      user: req.user,
    });
}

/**
 * handeling the user get request for all records
 * @param {object} req
 * @param {object} res
 */
async function handelGetAll(req, res) {
  try {
    let modelRet = await req.model.get();
    let response = {
      count: modelRet.length,
      results: modelRet,
    };
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
}

module.exports = router;
