const mongoose=require("mongoose");

const OrderSchema=new mongoose.Schema({
    userId:
    {
      type:mongoose.Schema.Types.ObjectId,
      require:true,
      ref:"User"
    },
     items:
      [
        {
          productId:{type:mongoose.Schema.Types.ObjectId},
          require:true,
          ref:"product",
          quantity:{type:Number,require:true,default:1},
          price:{type:Number,require:true},
        }
      ],
      totalAmount:{type:Number,require:true},
      address:{type:String,require:true},
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