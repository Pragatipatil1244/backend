const mongoose=require("mongoose");

const OrderSchema=new mongoose.Schema({
    userId:
    {
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:"User"
    },
     items:
      [
        {
          productId:{type:mongoose.Schema.Types.ObjectId},
          required:true,
          ref:"product",
          quantity:{type:Number,required:true,default:1},
          price:{type:Number,required:true},
        }
      ],
      totalAmount:{type:Number,required:true},
      address:{type:String,required:true},
      payment:{type:string},
      status:{
        type:String,
        default:"pending",
        enum:["pending","failed","paid"]
      }
},{
     timestamps:true
  })
const OrderModel=mongoose.model("cart",cartSchema);

module.exports=OrderModel;