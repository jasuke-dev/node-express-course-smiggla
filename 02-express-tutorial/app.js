const express = require('express')
const app = express()

const peopleRoute = require('./routes/people')
const authRoute = require('./routes/auth')

// static asset
app.use(express.static('./methods-public'))
//parse form data
app.use(express.urlencoded({extended:false}))
//parse json
app.use(express.json())

app.use('/api/people', peopleRoute)
app.use('/login', authRoute)

app.listen(5000,()=>{
  console.log('listening 5000')
})