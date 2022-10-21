const User = require('../models/User')
const customErrors = require('../errors')
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
    throw new customErrors.NotFoundError('No user with ID')
  }
  res.status(StatusCodes.OK).json({user})
}
const showCurrentUser = async (req, res) => {
  res.send('who am i')
}
const updateUser = async (req, res) => {
  res.send('update user')
}
const updateUserPassword = async (req, res) => {
  res.send('update password')
}

module.exports = {
  getAllUser,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword
}