const Task = require('../models/Task')



const getAllTasks = (req,res)=>{
  res.send('all items')
}

const createTasks = async (req,res)=>{
  try {
    const task = await Task.create(req.body)
    return res.status(201).json(task)
  } catch (error) {
    return res.status(500).json(error)
  }

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