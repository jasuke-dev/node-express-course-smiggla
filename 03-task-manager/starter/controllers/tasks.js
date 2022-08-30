const Task = require('../models/Task')



const getAllTasks = async (req,res)=>{
  try {
    const tasks = await Task.find({})
    res.status(200).json({tasks})
  } catch (error) {
    res.status(500).json({error})
  }
}

const createTasks = async (req,res)=>{
  try {
    const task = await Task.create(req.body)
    res.status(201).json({task})
  } catch (error) {
    res.status(500).json({error})
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