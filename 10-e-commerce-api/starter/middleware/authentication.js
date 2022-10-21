const CustomErrors = require('../errors')
const {isTokenValid} = require('../utils')


const authenticateUser = async (req,res,next)=>{
  const token = req.signedCookies.jwtToken

  if(!token) {
    throw new CustomErrors.UnauthenticatedError('you are not authed')
  }
  try {
    const {name, userId,role} = isTokenValid({token})
    req.user = {name, userId, role}
    next()
  } catch (error) {
    throw new CustomErrors.UnauthenticatedError('you are not authed1')
    
  }
  console.log('token present');
}

module.exports = {
  authenticateUser
}