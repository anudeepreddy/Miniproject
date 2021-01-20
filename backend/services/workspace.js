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
      data = data.toJSON();
      // if(user!=data.owner._id && !data.collaborators.includes(user)){
      //   reject(new Error("Unauthorized Access"));
      //   return;
      // }
      data.isOwner = user==data.owner._id?true:false; 
      resolve(data);
    });
  })
}

