const { default: mongoose } = require("mongoose")
const validator = require('validator')
const bcrypt = require('bcryptjs')


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
    minLength : 3,
  },
  role : {
    type : String,
    enum : ['admin','user'],
    default : 'user'
  }
})

UserSchema.pre('save', async function(){
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function(candidatePassword){
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

module.exports = mongoose.model('User',UserSchema)