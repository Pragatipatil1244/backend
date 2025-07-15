const mongoose=require("mongoose");

const productSchema = new mongoose.Schema({
    name:{type:String,required:true},
    category:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true},
    rating:{type:Number},
    imageUrl:{type:String,required:true}
},{
    timestamps:true
})
const productModel = mongoose.model("Product",productSchema);

module.exports=productModel;