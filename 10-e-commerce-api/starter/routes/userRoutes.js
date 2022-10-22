const express = require('express')
const router = express.Router()
const {
  authenticateUser,
  authorizePermission
} = require('../middleware/authentication')

const {
  getAllUser,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword
} = require('../controllers/userController')

router.route('/').get(authenticateUser, authorizePermission('admin','super'),getAllUser)

router.route('/showMe').get(showCurrentUser)
router.route('/updateUser').patch(authenticateUser,updateUser)

router.route('/updateUserPassword').patch(updateUserPassword)


router.route('/:id').get(authenticateUser,getSingleUser)

module.exports = router