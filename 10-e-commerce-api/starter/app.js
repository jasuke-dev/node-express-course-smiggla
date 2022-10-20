require('dotenv').config()
require('express-async-errors')

const { json } = require('express')
const express = require('express')
const App = express()

//rest packages
const morgan = require('morgan')
const cookie = require('cookie-parser')

//db
const connectDB = require('./db/connect')
//middleware
const NotFoundMiddleware = require('./middleware/not-found')
const ErrorHandlerMiddleware = require('./middleware/error-handler')

//routes
const authRouter = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
//middleware
App.use(morgan('tiny'))
App.use(express.json())
App.use(cookieParser())


//route
App.get('/',(req, res)=>{
  console.log(req.cookies)
  res.send('<h1>jaja</h1>') 
})
App.get('/api/v1',(req, res)=>{
  console.log(req.cookies)
  res.send('<h1>cookies</h1>') 
})
App.use('/api/v1/auth/', authRouter)
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


