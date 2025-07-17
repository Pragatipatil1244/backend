
const Rating = require("../model/Rating");
const Product = require("../model/Product");
const Order = require("../model/Order");

exports.addRating = async (req, res, next) => {
  try {
    const { productId, rating, review="" } = req.body;
    const userId = req.user.id;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    const order = await Order.findOne({
      userId,
      "items.productId": productId,
    });

    if (!order) {
      return res
        .status(403)
        .json({ message: "You must purchase the product before rating." });
    }
    const item = order.items.find(
      (item) => item.productId.toString() === productId && !item.rated
    );

    if (!item) {
      return res
        .status(400)
        .json({ message: "Product already rated or not found in order." });
    }
    let existingRating = await Rating.findOne({ productId, userId });
    let newRating;
    if (existingRating) {
      existingRating.rating = rating;
      existingRating.review = review;
      await existingRating.save();
    } else {
      newRating = new Rating({ productId, userId, rating, review });
      await newRating.save();
    }
    item.rated = true;
    await order.save();

    return res.status(200).json({
      message: existingRating ? "Rating updated" : "Rating added",
      rating: existingRating || newRating,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAverageRating = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const avgResult = await Rating.aggregate([
      { $match: { productId: require("mongoose").Types.ObjectId(productId) } },
      { $group: { _id: "$productId", averageRating: { $avg: "$rating" } } },
    ]);

    if (!avgResult.length) {
      return res.status(200).json({ averageRating: 0 });
    }

    res
      .status(200)
      .json({ averageRating: avgResult[0].averageRating.toFixed(2) });
  } catch (err) {
    next(err);
  }
};
