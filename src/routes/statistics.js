const express = require('express');
const router = express.Router();
const {getStatistics} = require('../models/db')
const {stCodes, Respond} = require('database-poems')

/* GET home page. */
router.get('/', async (req, res, next) => {
  let rows = new Respond()
  rows = await getStatistics().catch(err => rows = err)
  res.status(rows.code).json(rows);
});

module.exports = router;
