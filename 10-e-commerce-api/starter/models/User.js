const { default: mongoose } = require("mongoose")
const validator = require('validator')

const UserSchema = new mongoose.Schema({
  name : {
    type : String,
    required : [true, 'Please Provide Name'],
    minLength : 3,
    maxLength : 30,
  },
  email : {
    type : String,
    required : [true, 'Please Provide Email'],
    unique : true,
    validate : {
      validator : validator.isEmail,
      message: 'Please put the correct email'
    }
  },
  password : {
    type : String,
    required : [true, 'Please Provide Password'],
    minLength : 6,
  },
  role : {
    type : String,
    enum : ['admin','user'],
    default : 'user'
  }
})

module.exports = mongoose.model('User',UserSchema)