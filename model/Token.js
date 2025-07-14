const mongoose=require("mongoose");

const tokenSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId(ObjectId),
             require:true,
            ref:"User"
        },
        tokenId:{
            type:String,require:true
        }
            
},{
 timestamps:true
  })
const tokenModel=mongoose.model("token",tokenSchema);

module.exports=tokenModel;
