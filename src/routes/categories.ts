import express from "express"
const categoriesRouter = express.Router();
import { callQuery } from "../models/db"
import { stCodes } from "database-poems"

/* GET users listing. */
categoriesRouter.get("/", (req, res, next) => {
  callQuery(res, "SELECT * FROM keimena_cat ORDER BY id ASC")
});

categoriesRouter.get("/:id", async (req, res, next) => {
  let id = req.params.id;
  if (!isNaN(parseInt(id))) {
    callQuery(res, `SELECT * FROM keimena_cat WHERE id = ${parseInt(id)}`)
  } else {
    let rows = { status: stCodes.error, code: 406, data: [] };
    rows.error = `Το "${id}" δεν είναι αποδεκτή επιλογή.`;
    res.status(rows.code).json(rows);
  }
  
});
export default  categoriesRouter;
