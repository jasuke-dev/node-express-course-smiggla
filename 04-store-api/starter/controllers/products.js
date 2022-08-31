
const getAllProductsStatic = async (req,res)=>{
  throw Error('testing async errors')
  res.status(200).json({msg:'product static route'})
}

const getAllProducts = async (req,res)=>{
  res.status(200).json({msg:'product route'})
}

module.exports = {
  getAllProducts,
  getAllProductsStatic
}