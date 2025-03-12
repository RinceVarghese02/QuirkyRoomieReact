const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

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

//bcrypt
userSchema.pre('save',async function(next){
    const user=this;
    // console.log(user.password)
    if(!user.isModified('password')){
        next()
    }
    try {
        const salt=await bcrypt.genSalt(10);
        // console.log(salt)
        const hash=await bcrypt.hash(user.password, salt);
        // console.log(hash)
        user.password=hash;
    } catch (error) {
        next(error)
    }
})

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