const express = require('express')
const app = express()
const taskRoutes = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()

const port = 5000;


//middleware JSON
app.use(express.json())

app.get('/',(req,res)=>{
  res.send('task mnager project')
})

app.use('/api/v1/tasks', taskRoutes)

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

