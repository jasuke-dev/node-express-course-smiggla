const express = require('express')
const app = express()

const taskRoutes = require('./routes/tasks')

const port = 5000;


//middleware JSON
app.use(express.json())

app.get('/',(req,res)=>{
  res.send('task mnager project')
})

app.use('/api/v1/tasks', taskRoutes)




app.listen(port,console.log(`Server listening port ${port}...`))
