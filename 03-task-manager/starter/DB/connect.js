const mongoose = require('mongoose')

const connectString = 'mongodb+srv://ega:ega@nodeexpressprojects.7hoerwa.mongodb.net/03-TASK-MANAGER?retryWrites=true&w=majority'

const connectDB = (url)=>{
  return mongoose
    .connect(connectString,{
      useNewUrlParser:true,
      useCreateIndex:true,
      useFindAndModify:false,
      useUnifiedTopology:true
    })
}

module.exports = connectDB