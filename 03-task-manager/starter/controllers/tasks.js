const getAllTasks = (req,res)=>{
  res.send('all items')
}

const createTasks = (req,res)=>{
  res.json(req.body)

}

const getTask = (req,res)=>{
  res.json({
    id:req.params
  })
}
const updateTask = (req,res)=>{
  res.send('update tasks')
}
const deleteTask = (req,res)=>{
  res.send('delete tasks')
}


module.exports = {
  getAllTasks,
  createTasks,
  getTask,
  updateTask,
  deleteTask
}