const express = require('express')
const app = express()
const connectDB = require('./db/connect')

const taskRoutes = require('./routes/tasks')

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
    await connectDB()
    console.log('DB connected')
    app.listen(port,console.log(`Server listening port ${port}...`))
  } catch(err){
    console.log(err)
  }
}

start()

