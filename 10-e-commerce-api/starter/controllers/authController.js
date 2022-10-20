require('dotenv').config()
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const jwt = require('jsonwebtoken')
const {createJWT} = require('../utils')

const register = async (req, res) => {
  const {email, name, password} = req.body

  const emailAlreadyExists = await User.findOne({email})
  if(emailAlreadyExists){
    throw new CustomError.BadRequestError('Email already exists')
  }

  // first 

  const user = await User.create({name, email, password})
  const tokenUser = {name:user.name, userId:user._id, role:user.role}
  const token = createJWT({payload : tokenUser})

  const oneDay = 1000 * 60 *60 *24
  res.cookie('jwtToken', token, {
    httpOnly : true,
    expires: new Date(Date.now() + oneDay),
  })
  res.status(StatusCodes.CREATED).json({user: tokenUser})
}

const login = async (req, res) => {
  res.send('register')
}

const logout = async (req,res) => {
  res.send('logout')
}

module.exports = {
  register,
  login,
  logout
}