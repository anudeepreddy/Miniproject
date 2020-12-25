const workspaceModel = require('../models/workspace');

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