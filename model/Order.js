
const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      price: Number,
    },
  ],
  totalAmount: Number,
  status: {
    type: String,
    enum: ["pending", "paid", "failed","delivered"],
    default: "pending",
  },
  paymentId: String,
  address: String,
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Order", orderSchema);

