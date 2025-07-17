// routes/cartRoutes.js
const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");

router.post("/add", cartController.addToCart);
router.post("/remove", cartController.removeFromCart);
router.get("/", cartController.viewCart);
router.put("/update", cartController.updateCartItemQty);

module.exports = router;