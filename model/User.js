const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String},
    googleId:{type:String},
    role:{type:String,default:"customer",enum:["customer","admin"]}

},
{
    timestamps:true
})
const UserModel=mongoose.model("User",userSchema)
module.exports=UserModel;