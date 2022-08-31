const { Mongoose } = require("mongoose");

const ProductSchema = new Mongoose.Schema({
  name: {
    type:String,
    required:[true, 'Product name must be provided']
  },
  price : {
    type:NUmber,
    required:[true,'Product price must be provided']
  },
  featured : {
    type:Boolean,
    default:false
  },
  rating : {
    type:Number,
    default:4.5,
  },
  created_at:{
    type:Date,
    default:Date.now()
  },
  company: {
    type:String,
    enum:{
      values:['ikea','liddy','caressa','marcos'],
      message:'{VALUE} is not supported'
    }
    // enum:['ikea','liddy','caressa','marcos']
  }
})

module.exports = mongoose.model('product',ProductSchema)