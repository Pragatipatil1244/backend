const express = require("express");
const router = express.Router();
const ratingController = require("../controller/ratingController");

router.post("/", ratingController.addRating);
router.get("/:productId/average", ratingController.getAverageRating);

module.exports = router;