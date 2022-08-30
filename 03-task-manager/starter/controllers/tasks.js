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

const getTask = async (req,res)=>{
  try {
    //deconstruktor dengan alias
    const {id:taskID} = req.params
    const task = await Task.findOne({_id:taskID})
    if(!task){
      return res.status(404).json({msg:`No task with id : ${taskID}`})
    }
    res.status(200).json({task})
  } catch (error) {
    res.status(500).json({error})
  }
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