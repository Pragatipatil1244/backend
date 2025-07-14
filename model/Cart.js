const mongoose=require("mongoose");

const cartSchema=new mongoose.Schema({
    userId:
    {
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:"User"
    },
     items:
      [
        {
          productId:{type:mongoose.Schema.Types.ObjectId,
          required:true,
          ref:"product",
          },
          quantity:{
            type:Number,required:true,default:1
          },
        }
      ]
},{
     timestamps:true
  })
const cartModel=mongoose.model("cart",cartSchema);

module.exports=cartModel;