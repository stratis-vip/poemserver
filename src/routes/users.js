 const express = require('express');
 const router = express.Router();

 
/* GET users listing. */
router.get('/', async (req, res, next) => {
  
  res.status(rows.code).json(rows);
});

module.exports = router;
