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
          ref:"Product",
          },
          quantity:{
            type:Number,required:true,default:1
          },
        }
      ]
},{
     timestamps:true
  })
const CartModel=mongoose.model("Cart",cartSchema);

module.exports=CartModel