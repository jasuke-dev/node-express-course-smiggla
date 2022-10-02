const {StatusCodes} = require('http-status-codes')
const path = require('path')
const CustomError = require('../errors')

const uploudProductImage = async(req,res) => {
  if(!req.files){
    throw new CustomError.BadRequestError('No File Uplouded')
  }
  const productImage = req.files.image
  console.log(productImage);
  if(!productImage.mimetype.startsWith('image')){
    throw new CustomError.BadRequestError('please uplouad image')
  }
  
  const maxSize = 1024 * 1024
  
  if(productImage.size > maxSize){
    throw new CustomError.BadRequestError('please upload image under 1kb')
  }

  const imagePath = path.join(__dirname,'../public/uploads/'+`${productImage.name}`)
  
  await productImage.mv(imagePath)
  return res.status(StatusCodes.OK)
    .json({image:{src:`/uploads/${productImage.name}`}})
}

module.exports = {
  uploudProductImage
}