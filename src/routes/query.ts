import express from'express'
const queryRouter = express.Router();
import {callQuery} from '../models/db'

/* GET home page. */
queryRouter.get('/', async (req, res, next) => {
  callQuery(res,req.query.query)
});


export default queryRouter;
