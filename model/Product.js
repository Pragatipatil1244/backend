const mongoose=require("mongoose");

const productSchema = new mongoose.Schema({
    name:{type:String,require:true},
    category:{type:String,require:true},
    description:{type:String,require:true},
    price:{type:Number,require:true},
    quantity:{type:Number,require:true},
    rating:{type:Number},
    imageUrl:{type:String,require:true}
},{
    timestamps:true
})
const productModel = mongoose.model("product",productSchema);

module.exports=productModel;