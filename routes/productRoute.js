const express= require("express");
const { createProduct, getAllProducts,getProductById, updateProductById, deleteProductById } = require("../controller/Productcontroller");

const router=express.Router();

router.post("/",createProduct)
router.get("/",getAllProducts);
router.get("/:id",getProductById);
router.put("/:id",updateProductById);
router.delete("/:id",deleteProductById);

module.exports=router;