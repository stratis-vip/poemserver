import  express from "express"
const  poemsRouter = express.Router()
import  { callQuery } from "../models/db"
import  { stCodes } from "database-poems"
import { ApiResponse } from "../models/utils";

poemsRouter.get("/", async (req, res, next) => {
  callQuery(res, `SELECT * FROM keimena`);
});

poemsRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  let respond:ApiResponse = {}

  if (isNaN(parseInt(id))) {
    respond.status = stCodes.error;
    respond.code = 406;
    respond.error = `Το "${id}" δεν είναι αποδεκτή επιλογή.`;
    res.status(respond.code).json(respond);
  } else {
    callQuery(res, `SELECT * FROM keimena WHERE id = ${id}` )
  }
});
export default poemsRouter;
