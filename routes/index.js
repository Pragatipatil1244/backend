const express= require("express");

const route=express.Router();
const userRoute=require("./userRoutes")
const productRoute=require("./productRoute");
const authRoute=require("./authRoute");
const cartRoute=require("./cartRoute");
const { auth } = require("../Middleware/aurth");
const orderRoute=require("./orderRoute");
const router = require("./orderRoute");

const routes=express.Router();


routes.use("/users",userRoute);
routes.use("/products",productRoute);
routes.use("/auth", authRoute);
routes.use("/carts",auth, cartRoute)
router.use("/orders", auth, orderRoute);
module.exports=routes;






