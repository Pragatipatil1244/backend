const mongoose=require("mongoose");

const ratingSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId(ObjectId),
         required:true,
        ref:"User"
    },
productId:{type:mongoose.Schema.Types.ObjectId(ObjectId),
          required:true,
          ref:"product",
},
ratingCount:{type:Number,min:1,max:1,max:5,required:true},
review:{type:String}
},{
     timestamps:true
  })
const OrderModel=mongoose.model("rating",ratingSchema);

module.exports=OrderModel;
