require('dotenv').config()
require('express-async-errors')

const { json } = require('express')
const express = require('express')
const App = express()

//rest packages
const morgan = require('morgan')

//db
const connectDB = require('./db/connect')
//middleware
const NotFoundMiddleware = require('./middleware/not-found')
const ErrorHandlerMiddleware = require('./middleware/not-found')


//middleware
App.use(morgan('tiny'))
App.use(express.json())


//route
App.get('/',(req, res)=>{
  res.send('<h1>jaja</h1>') 
})
App.use(NotFoundMiddleware)
App.use(ErrorHandlerMiddleware)

const port = process.env.PORT || 5000
const start = async() => {
  try {
    await connectDB(process.env.MONGO_URI)
    console.log('connected to DB');
    App.listen(port,()=>{
      console.log(`Server listening to port:${port}`);
    })
  } catch (error) {
    console.log(error)
  }
} 

start()


