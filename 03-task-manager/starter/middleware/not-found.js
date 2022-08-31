const notFound = (req,res)=>{
  res.status(404).send('Route doesnt Exist')
}

module.exports = notFound