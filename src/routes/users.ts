import express from 'express'
const usersRouter = express.Router();

 
/* GET users listing. */
usersRouter.get('/', async (req, res, next) => {
  
  res.send('users???');
});

export default usersRouter
