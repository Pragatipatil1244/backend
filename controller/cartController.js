const cartModel = require("../model/Cart");
const cart = require("../model/Cart");

exports.addToCart = async (req, res, next) => {
const{productId, quantity,userId} = req.body;

    try{
let cart=await cartModel.findOne({userId});
if(!cart){
    await cartModel.create({userId,items:[]})
}
cart.items.find((item) => item.prodectId.toString()===productId);
if(existingCart){
    existingCart.quantity += quantity;
}
else{
    cart.items.push({prodectId, quantity});
}
await cart.save
res.status(200).json({message:"cart added"});
    }catch(error){
        next(error)
    }
}
exports.removeCartProduct = async (req, res, next) => {
    const {productId, userId} = req.body;


    try{
     const cart = await cartModel.findOne({userId});
     if(!cart){
        const error=new error("no product in the cart");
        error.statusCode=400;
        throw error;


     }
     cart.items= cart.items.filter((item) => item.productId.toString() !== productId)
     await cart.save();
     res.status(200).json({message:"product removed from the cart"})
    }catch(error){
        next(error);
    }
};

exports.viewcart = async (req, res, next) => {
    const {userId} = req.body;
    try{
const cart = await cartModel.findOne({userId}).populate("items.productId", "name price description quantity imageUrl");
if(!cart){
    return res.status(200).json({message:"cart is empty",items:[]});
    }
    res.status(200).json({cart});
}catch(error){
        next(error);
    }
};

exports.updateCartItem = async (req, res, next) => {
    const {userId,productId, quantity, } = req.body;

    try{
        const cart = await cartModel.findOne({userId});
        if(!cart){
            const error = new Error(" cart is empty");
            error.statusCode = 400;
            throw error;
        }
        const neededItem = cart.items.find((item) => item.productId.toString() === productId)
        neededItem.quantity = quantity;
        await cart.save();
        res.status(200).json({message:"updated"});
       
    
    } catch(error) {
        next(error);
    }
};
