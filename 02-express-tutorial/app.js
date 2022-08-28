const express = require('express')
const app = express()

const {people, products} = require('./data.js')

app.get('/',(req,res)=>{
  res.send('<h1>home Page</h1><a href="/api/products/">Products</a>')
})

app.get('/api/products',(req,res)=>{
  const newProdutcs = products.map((products)=>{
    const {id,name,image} = products;
    return {id,name,image}
  })
  res.json(newProdutcs)
})

app.get('/api/products/:productID',(req,res)=>{
  const {productID} = req.params;
  const singleProduct = products.find((products)=>products.id === Number(productID))
  if(!singleProduct){
    res.status(404).send('<h1>Products doesnt exist</h1>')
  }else{

    res.json(singleProduct)
  }
})

app.get('/api/v1/query',(req,res)=>{
  console.log(req.query)
  const{search, limit} = req.query
  let sortedProducts = [...products]

  if(search){
    sortedProducts = sortedProducts.filter((product)=>{
      return product.name.startsWith(search)
    })
  }
  if(limit){
    sortedProducts = sortedProducts.slice(0,Number(limit))
  }
  if(sortedProducts.length < 1){
    res.status(404).send('<h1>Products doesnt exist</h1>')
  }else{
    res.status(200).json(sortedProducts)
  }
})

app.listen(5000,()=>{
  console.log('listening 5000')
})