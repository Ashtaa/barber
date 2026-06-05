const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  barber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  name: String,

  duration: Number,

  price: Number,
});

module.exports = mongoose.model(
  "Service",
  ServiceSchema
);