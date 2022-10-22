const User = require('../models/User')
const CustomErrors = require('../errors')
const { StatusCodes } = require('http-status-codes')
const getAllUser = async (req, res) => {
  console.log(req.user);
  const users = await User.find({role:'user'}).select('-password')
  res.status(StatusCodes.OK).json({users})
}
const getSingleUser = async (req, res) => {
  // destructuritation mengambil nilai id pada req.params lalu menyimpannya dengan variabel userId
  const {params:{id : userId}} = req
  console.log(userId);
  const user = await User.findOne({_id : userId}).select('-password')
  if(!user){
    throw new CustomErrors.NotFoundError('No user with ID')
  }
  res.status(StatusCodes.OK).json({user})
}
const showCurrentUser = async (req, res) => {
  
  res.status(StatusCodes.OK).json({user : req.user})
}
const updateUser = async (req, res) => {
  res.send('update user')
}
const updateUserPassword = async (req, res) => {
  const {oldPassword, newPassword} = req.body
  if(!oldPassword || !newPassword){
    throw new CustomErrors.BadRequestError('Please provide Old and New Password')
  }
  const {userId} = req.user
  const user = await User.findOne({_id : userId})
  const oldPasswordValid = await user.comparePassword(oldPassword)
  if(!oldPasswordValid){
    throw new CustomErrors.UnauthenticatedError('Please valid credentials')
  }
  user.password = newPassword
  await user.save()
  res.status(StatusCodes.OK).json({msg : 'password updated'})
}

module.exports = {
  getAllUser,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword
}