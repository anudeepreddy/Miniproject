const workspaceModel = require('../models/workspace');
const axios = require('axios')

exports.createWorkspace = async(data) => {
  const {name,language,owner} = data;
  const workspace = new workspaceModel({
    name,
    language,
    owner
  });
  return new Promise((resolve,reject)=>{
    workspace.save().then((w)=>{
      resolve(w._id);
    }).catch(reject);
  });
}

exports.fetchUserWorkspaces = async(user) => {
  return new Promise((resolve, reject)=>{
    workspaceModel.find(/*{owner: user}*/)
    .sort({createdDate:-1})
    .select({name:1,language:1})
    .exec((err,data)=>{
      if(err){
        reject(err);
        return;
      }
      resolve(data);
    })
  })
}

exports.fetchWorkspace = async(id, user) => {
  return new Promise((resolve, reject)=>{
    workspaceModel.findOne({_id: id}).populate('owner','username')
    .exec((err,data)=>{
      if(err){
        reject(err);
        return;
      }
      // if(user!=data.owner._id && !data.collaborators.includes(user)){
      //   reject(new Error("Unauthorized Access"));
      //   return;
      // }
      resolve(data);
    });
  })
}

exports.runCode = async(data)=>{

    return new Promise((resolve,reject)=>
    axios.post('https://rextester.com/rundotnet/api',data).then(res=>{
      //console.log(res.data);
        resolve(res.data);
    }).catch(err=>reject(err))
    );
}