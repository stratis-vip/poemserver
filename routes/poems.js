const express = require("express");
const router = express.Router();
const { callQuery } = require("../models/db");
const { Respond, stCodes } = require("database-poems");

router.get("/", async (req, res, next) => {
  callQuery(res, `SELECT * FROM keimena`);
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  let respond = new Respond();

  if (isNaN(parseInt(id))) {
    respond.status = stCodes.error;
    respond.code = 406;
    respond.error = `Το "${id}" δεν είναι αποδεκτή επιλογή.`;
    res.status(respond.code).json(respond);
  } else {
    callQuery(res, `SELECT * FROM keimena WHERE id = ${id}` )
  }
});

module.exports = router;
