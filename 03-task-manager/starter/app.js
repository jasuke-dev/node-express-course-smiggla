const express = require('express')
const app = express()
const taskRoutes = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()

const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

const port = process.env.PORT || 5000;


//middleware JSON
app.use(express.json())
//static files (folder public)
app.use(express.static('./public'))

app.use('/api/v1/tasks', taskRoutes)

//default jika route tidak ada
app.use(notFound)

//custom error handler
app.use(errorHandlerMiddleware)

const start = async()=>{
  try{
    console.log('connecting...')
    //dibuat sync untuk memastikan koneksi ke db dulu
    await connectDB(process.env.MONGO_URI)
    console.log('DB connected')
    app.listen(port,console.log(`Server listening port ${port}...`))
  } catch(err){
    console.log(err)
  }
}

start()

