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

  // 🔴 FIXED: Converted from a single object to a structured array of daily schedules
  workingHours: [
    {
      day: { type: String, required: true },     // e.g., "Monday"
      open: { type: String, default: "08:00" },  // e.g., "08:00" (24h format)
      close: { type: String, default: "20:00" }, // e.g., "20:00" (24h format)
      isOpen: { type: Boolean, default: true }   // Master toggle per individual day
    }
  ],

  // 🔴 ADDED: Emergency Pause property for instant shop closure mechanics
  isPaused: {
    type: Boolean,
    default: false,
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

module.exports = mongoose.model("User", UserSchema);