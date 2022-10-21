const getAllUser = async (req, res) => {
  res.send('get all user')
}
const getSingleUser = async (req, res) => {
  res.send('get Singel user')
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