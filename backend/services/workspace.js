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
    workspaceModel.find({owner: user})
    .sort({createdDate:-1})
    .select({name:1,language:1,collaborators:1})
    .populate('collaborators','username')
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
    workspaceModel.findOne({_id: id}).populate('owner','username').populate('collaborators','username')
    .exec((err,data)=>{
      if(err){
        reject(err);
        return;
      }
      data = data.toJSON();
      if(user!=data.owner._id && !isCollaborator(data.collaborators,user)){
        reject(new Error("Unauthorized Access"));
        return;
      }
      data.isOwner = user==data.owner._id?true:false; 
      resolve(data);
    });
  })
}

function isCollaborator(collaborators,user){
  for(let i=0;i<collaborators.length;i++){
    if(collaborators[i]._id==user)
      return true;
  }
  return false;
}

exports.updateWorkspace = async(_id, collaborators, language, user) => {

  return new Promise((resolve, reject)=>{
    workspaceModel.findById(_id,(err,doc)=>{
      if(doc.owner==user){
        workspaceModel.updateOne({_id},{collaborators,language},(err,doc)=>{
          if(err){
            console.log(err)
            reject(err);
            return;
          }
          resolve(doc);
        })
      } else{
        reject(new Error("Unauthorized Access"))
      }
    })
    
  })
}

exports.deleteWorkspace = async(_id,user) => {
  return new Promise((resolve, reject)=>{
    workspaceModel.findById(_id,(err,doc)=>{
      if(doc.owner==user){
        workspaceModel.deleteOne({_id},(err)=>{
          if(err){
            reject(err);
            return;
          }
          resolve();
        })
      } else {
        reject(new Error("Unauthorized Access"))
      }
    })
  })
}

