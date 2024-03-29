const router = require('express').Router();
const {createWorkspace, fetchUserWorkspaces, fetchWorkspace, updateWorkspace, deleteWorkspace, saveCode, fetchSharedWorkspaces} = require('../services/workspace');

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

router.get('/shared', async(req, res)=>{
  const user = req.user._id;
  try{
    const data = await fetchSharedWorkspaces(user);
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

router.put('/savecode', async(req,res)=>{
  //console.log(req.body);
  const {id,content}= req.body;
  try{
    const data= await saveCode(id,content);
    res.send({status:true, data});
  }catch(err){
    console.log(err);
    res.status(500).send({status: false, message: 'Internal Server Error'});
  }
})

router.put('/:id', async(req, res)=>{
  const user = req.user._id;
  const { _id, collaborators, language } = req.body;
  try{
    const data = await updateWorkspace(_id, collaborators, language, user);
    res.send({status:true, data});
  } catch(err){
    console.log(err);
    if(err.message==='Unauthorized Access'){
      res.status(401).send({status: false, message: err.message});
      return;
    }
    res.status(500).send({status: false, message: 'Internal Server Error'})
  }
})

router.delete('/:_id', async(req,res)=>{
  const user = req.user._id;
  const _id = req.params._id;
  try {
    await deleteWorkspace(_id, user);
    res.send({status: true});
  } catch(err){
    if(err.message==='Unauthorized Access'){
      res.status(401).send({status: false, message: err.message});
      return;
    }
    res.status(500).send({status: false, message: 'something went wrong'})
  }
  
})



module.exports = router;