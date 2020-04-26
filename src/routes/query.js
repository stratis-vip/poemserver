const express = require('express');
const router = express.Router();
const {callQuery} = require('../models/db')

/* GET home page. */
router.get('/', async (req, res, next) => {
  callQuery(res,req.query.query)
});


module.exports = router;
