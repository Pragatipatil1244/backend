
const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");

router.post("/create", orderController.createOrder);
router.get("/my-orders", orderController.getUserOrders);
router.get("/all", orderController.getAllOrders);
router.put("/status", orderController.updateOrderStatus);
router.post("/webhook", orderController.handlePaymentWebhook);

module.exports = router;
