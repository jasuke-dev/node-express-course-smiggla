require('dotenv').config()
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const jwt = require('jsonwebtoken')
const {attachCookiesToResponse} = require('../utils')

const register = async (req, res) => {
  const {email, name, password} = req.body

  const emailAlreadyExists = await User.findOne({email})
  if(emailAlreadyExists){
    throw new CustomError.BadRequestError('Email already exists')
  }

  // first 

  const user = await User.create({name, email, password})
  const tokenUser = {name:user.name, userId:user._id, role:user.role}

  attachCookiesToResponse({res, user:tokenUser})

  res.status(StatusCodes.CREATED).json({user: tokenUser})
}

const login = async (req, res) => {
  // get email and password login request
  const {email, password} = req.body
  if( !email || !password){
    throw new CustomError.BadRequestError('Please provides email and/or password')
  }

  // Check if there user with requested email
  const user = await User.findOne({email})
  if(!user){
    throw new CustomError.NotFoundError('User Doesnt Exist')
  }
  // check credentials
  const isPasswordCorrect = await user.comparePassword(password)
  if(!isPasswordCorrect){
    throw new CustomError.UnauthenticatedError('Invalid Credentials')
  }
  // create payload for JWT token
  const tokenUser = {name:user.name, userId:user._id, role:user.role}
  // create JWT and attach to cookies
  attachCookiesToResponse({res, user:tokenUser})

  res.status(StatusCodes.CREATED).json({user: tokenUser})
}

const logout = async (req,res) => {
  res.cookie('jwtToken', 'token expired',{
    httpOnly: true,
    expires: new Date(Date.now())
  })
  res.status(StatusCodes.OK).json({msg:'user logout!'})
}

module.exports = {
  register,
  login,
  logout
}