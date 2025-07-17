const express=require("express");
const { getAllUsers, userRegister } = require("../controller/userContrller");

const router=express.Router();

router.get("/",getAllUsers);
router.post("/register",userRegister)
module.exports=router;