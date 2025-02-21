const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:String,
    flatcode:String,
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
});

const userModel=mongoose.model("users",userSchema)

const complaintSchema=mongoose.Schema({
    title:String,
    description:String,
    type:{
        type:String,
    },
    severity:{
        type:String,
    },
});

const complaintModel=mongoose.model("complaints",complaintSchema)

module.exports={userModel,complaintModel};