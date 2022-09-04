
const getAllJobs = async (req,res) =>{
  res.send('get all jobs')
}
const getJob = async (req,res) =>{
  res.send('get single jobs')
}
const createJob = async (req,res) =>{
  res.send('create jobs')
}
const updateJob = async (req,res) =>{
  res.send('update job jobs')
}
const deleteJob = async (req,res) =>{
  res.send('delete job')
}



module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
}