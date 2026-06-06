const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  shopName: {
    type: String,
default: "",
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  images: {
    type: [String],
    default: [],
  },

  workingHours: {
    open: {
      type: String,
      default: "08:00",
    },

    close: {
      type: String,
      default: "20:00",
    },
  },

  services: [
    {
      nameEN: String,
      nameAM: String,
      price: Number,
      duration: Number,
    },
  ],

  ratingPercentage: {
    type: Number,
    default: 100,
  },

  role: {
    type: String,
    enum: ["barber", "user", "admin"],
    default: "barber",
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model(
  "User",
  UserSchema
);