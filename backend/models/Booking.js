const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    barber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    service: {
      type: String,
      required: true,
    },

    servicePrice: {
      type: Number,
      default: 0,
    },

    serviceDuration: {
      type: Number, // minutes
      default: 30,
    },

    // 🔴 CHANGE 1: Swapped from Date to String to lock down plain "YYYY-MM-DD" matching
    bookingDate: {
      type: String, 
      required: true,
    },

    // 🔴 CHANGE 2: Added the completely missing time slot field
    bookingTime: {
      type: String,
      required: true,
      trim: true, // Stores exactly clean text like "08:30 AM"
    },

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: null,
    },

    review: {
      type: String,
      default: "",
    },

    cancellationReason: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", BookingSchema);