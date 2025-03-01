const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')

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

//JsonWebToken
userSchema.methods.generateToken = function(){
    try{

        return jwt.sign({email:this.email,id:this._id.toString()},'thisissecret',{expiresIn:'10d',})

    }catch(error){
        console.log(error)
    }
}

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
    createdAt: { type: Date, default: Date.now, immutable:true, }
});

const complaintModel=mongoose.model("complaints",complaintSchema)

module.exports={userModel,complaintModel};