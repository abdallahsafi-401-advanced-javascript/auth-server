'use strict';

const express = require('express');
const router = express.Router();
const modelFinder = require('../middleware/model-finder.js');


router.param('model', modelFinder.getModel);

//------------- Routes -----------

// add
router.post('/:model', handelPost);

// get all
router.get('/:model', handelGetALL);

//------------- Handlers -----------

/**
 * handeling the user post request
 * @param {object} req 
 * @param {object} res 
 */
async function handelPost(req, res) {
  let model = req.body;
  try {
    let modelRet = await req.model.create(model);
    res.status(200).json(modelRet);
  } catch (err) {
    console.log('err', err);
  }
}

/**
 * handeling the user get request for all records
 * @param {object} req 
 * @param {object} res 
 */
async function handelGetALL(req, res) {
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
