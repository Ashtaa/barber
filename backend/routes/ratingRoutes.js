const express = require("express");
const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  addRating,
  getRatingPercentage,
} = require("../controllers/ratingController");

router.post(
  "/",
  authMiddleware,
  addRating
);

router.get(
  "/:barberId",
  getRatingPercentage
);

module.exports = router;