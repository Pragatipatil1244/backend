const productModel = require("../model/Product");
const Rating= require("../model/Rating");

exports.createProduct=async(req,res,next)=>{
const {name,category,description,price,quantity,imageurl}=req.body
    try{
        const product=await productModel.create({name,description,category,price,quantity,imageurl})
        res.status(201).json({
            message:"Product created successfully",
            product})
    }catch(error){
        next(error)
    }

}

exports.getAllProducts=async (req,res,next) => {
    try{
      const product=await productModel.find();
  res.status(200).json(product)
    }catch(error){
        next(error)
    }

}

exports.getProductById=async(req,res,next)=>{
    const{id}=req.params;
    
    try{
const product=await productModel.findById(id);
    if(!product){
const error=new Error("Product does not exists");
error.ststusCode=400;
throw error
const ratings=await Rating.find({id})
    }
 let averageRating = 0;
    if (ratings.length > 0) {
      const sum = ratings.reduce((total, rating) => total + rating.rating, 0);
      averageRating = sum / ratings.length;
    }
    const response = {
      ...product.toObject(),
      averageRating: parseFloat(averageRating.toFixed(1)),
      totalRatings: ratings.length,
      outOf5: 5,
    };

    res.json(response);
    }catch(error){
        next(error)
    }

}


exports.updateProductById=async(req,res,next)=>{
const{id}=req.params;
const {name,category,description,price,quantity,imageurl}=req.body;
     try{
        const product=await productModel.findById(id);
     if(!product){
      const error=new Error("Product does not exists");
     error.ststusCode=(400);
      throw error
    }
   const updateProduct=await productModel.updateOne({_id:id},{$set:{name,description,category,price,quantity,imageurl}})
   res.status(202).json({message:"Product updated",product:updateProduct})
}catch(error){
    next(error)
}
}
exports.deleteProductById=async(req,res,next) => {
    const{id}=req.params;
    try{
        const deleteProduct=await findByIdAndDelete(id)
        if(!deleteProduct){
            const error=new error("product not found")
        }
        res.status(200).json({message:"product deleted successfuly"})
    }catch(error){
        next(error)
    }
}