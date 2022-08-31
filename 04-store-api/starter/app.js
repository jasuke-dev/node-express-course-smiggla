require('dotenv').config()
//async errors
require('express-async-errors')

const express = require('express')
const app = express()

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

const productsRouter = require('./routes/products')
const port = process.env.PORT || 5000

const connectDB = require('./db/connect')
//use middleware
app.use(express.json())

//routes
app.get('/',(req,res)=>{
  res.send(`<h1>Store API</h1><a href="/api/v1/products">Produtcs Route</a>`)
})
app.use('/api/v1/products', productsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async ()=>{
  try {
    console.log('connecting')
    await connectDB(process.env.MONGO_URI)
    console.log('conected to DB')
    app.listen(port,console.log(`server listening on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()
