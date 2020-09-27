const mongoose=require('mongoose');
const workspaceSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    workspaceid:{
        type:String
    },
    collaborators:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
    }],
    language:{
        type: String,
        required: true
    },
    content:{
        type:String
    },
    sharing:{
        type:Boolean,
        default:false
    },
    createdDate:{
        type: Date, 
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('WorkSpace', workspaceSchema);

