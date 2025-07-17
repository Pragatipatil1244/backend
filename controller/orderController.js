const Order = require("../model/Order");
const Cart = require("../model/Cart");

exports.createOrder = async (req, res) => {
  try {
    const { address, paymentMethod } = req.body;
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const orderItems = cart.items.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.price,
    }));

    const total = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const order = new Order({
      userId,
      items: orderItems,
      totalAmount: total,
      status: "pending",
      address,
    });

    await order.save();
    await Cart.findOneAndDelete({ userId });

    res.status(201).json({ message: "Order placed", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to place order" });
  }
};

exports.getUserOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId }).populate(
      "items.productId",
      "name price"
    );

    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("userId", "email")
      .populate("items.productId", "name");

    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId, status } = req.body;

    if (!["pending", "paid", "failed","delivered"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated", order });
  } catch (err) {
    next(err);
  }
};

exports.handlePaymentWebhook = async (req, res, next) => {
  try {
    const { paymentId, status } = req.body;

    const order = await Order.findOne({ paymentId });
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status === "success" ? "paid" : "failed";
    await order.save();

    res.status(200).json({ message: "Payment status updated", order });
  } catch (err) {
    next(err);
  }
};