const {BadRequestError} = require('../errors')

const testUser = (req,res,next)=>{
  if(req.user.testUser){
    throw new BadRequestError('Test User only read')
  }
  next()
}

module.exports = testUser