const express= require("express");

const route=express.Router();
const userRoute=require("./userRoutes")
const productRoute=require("./productRoute");
const authRoute=require("./authRoute");
const cartRoute=require("./cartRoute");
const { auth } = require("../Middleware/aurth");
const orderRoute=require("./orderRoute");
const userRouts = require("./orderRoute");
const ratingRouts=require("./ratingRoute");



const routes=express.Router();


routes.use("/users",userRoute);
routes.use("/products",productRoute);
routes.use("/auth", authRoute);
routes.use("/carts",auth, cartRoute)
routes.use("/orders", auth, orderRoute);
routes.use("/ratings",auth,ratingRouts);
module.exports=routes;






