import express  from 'express'
const statisticsRouter = express.Router()
import {getStatistics}  from '../models/db'
import {stCodes}  from 'database-poems'

/* GET home page. */
statisticsRouter.get('/', async (req, res, next) => {
  // let rows = new Respond()
  let rows:any
  rows = await getStatistics().catch(err => rows = err)
  res.status(rows.code).json(rows);
});

export default statisticsRouter
