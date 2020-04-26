const express = require("express");
const router = express.Router();
const { callQuery } = require("../models/db");
const { stCodes } = require("database-poems");

/* GET users listing. */
router.get("/", (req, res, next) => {
  callQuery(res, "SELECT * FROM keimena_cat ORDER BY id ASC")
});

router.get("/:id", async (req, res, next) => {
  let id = req.params.id;
  if (!isNaN(parseInt(id))) {
    callQuery(res, `SELECT * FROM keimena_cat WHERE id = ${parseInt(id)}`)
  } else {
    let rows = { status: stCodes.error, code: 406, data: [] };
    rows.error = `Το "${id}" δεν είναι αποδεκτή επιλογή.`;
    res.status(rows.code).json(rows);
  }
  
});
module.exports = router;
