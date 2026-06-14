const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  // 🌟 Added Phone Number as the primary, unique identification anchor
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  // 🌟 Made optional so clients don't get blocked if they sign up with phone only
  email: {
    type: String,
    sparse: true, // Allows multiple null/empty values without throwing duplicate key errors
    trim: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

  // 🌟 Keeps track of the user's bookmarked shop IDs
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User" // Assuming your barbers also live in this collection or a separate "Barber" one
    }
  ],

  // 🌟 Default role is now client "user" instead of "barber"
  role: {
    type: String,
    enum: ["barber", "user", "admin"],
    default: "user",
  },
  
  // Backwards compatibility fallback if you mix shops and users in one collection
  images: { type: [String], default: [] },
  workingHours: [
    {
      day: { type: String },
      open: { type: String, default: "08:00" },
      close: { type: String, default: "20:00" },
      isOpen: { type: Boolean, default: true }
    }
  ],
  isPaused: { type: Boolean, default: false },
  services: [
    { nameEN: String, nameAM: String, price: Number, duration: Number }
  ],
  ratingPercentage: { type: Number, default: 100 }
}, {
  timestamps: true,
});

module.exports = mongoose.model("User", UserSchema);