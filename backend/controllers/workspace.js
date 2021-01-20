const router = require('express').Router();
const {createWorkspace, fetchUserWorkspaces, fetchWorkspace, runCode} = require('../services/workspace');

router.post('/new', async (req,res)=>{
  const data = req.body;
  try{
    const owner = req.user._id;
    const workspaceId = await createWorkspace({...data,owner});
    res.send({status: true, workspaceId});
  } catch(err){
    res.status(500).send({status: false, message: 'Internal Server Error'})
  }
});

router.get('/', async(req, res)=>{
  const user = req.user._id;
  try{
    const data = await fetchUserWorkspaces(user);
    res.send({status:true, data});
  } catch(err){
    res.status(500).send({status: false, message: 'Internal Server Error'})
  }
})

router.get('/:id', async(req, res)=>{
  const user = req.user._id;
  const {id} = req.params;
  try{
    const data = await fetchWorkspace(id, user);
    res.send({status:true, data});
  } catch(err){
    if(err.message==='Unauthorized Access'){
      res.status(401).send({status: false, message: err.message});
      return;
    }
    res.status(500).send({status: false, message: 'Internal Server Error'})
  }
})

module.exports = router;