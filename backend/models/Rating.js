const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
  barber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  stars: {
    type: Number,
    min: 1,
    max: 5,
  },
});

module.exports = mongoose.model(
  "Rating",
  RatingSchema
);