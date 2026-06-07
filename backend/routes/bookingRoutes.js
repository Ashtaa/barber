const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createBooking,
  getBookings,
  completeBooking,
  cancelBooking,
  rateBooking,
  getMyBookings,
  getBarberBookings, // 👈 1. Import the new controller method
} = require("../controllers/bookingController");

// 🔴 2. ADD THIS ENDPOINT RIGHT HERE:
// This listens for requests at: /api/bookings/slots/:barberId (assuming your base is /api/bookings)
router.get(
  "/slots/:barberId",
  authMiddleware,
  getBarberBookings
);

router.post("/", authMiddleware, createBooking);
router.get("/barber", authMiddleware, getBookings);
router.get("/my-bookings", authMiddleware, getMyBookings);
router.patch("/complete/:id", authMiddleware, completeBooking);
router.patch("/cancel/:id", authMiddleware, cancelBooking);
router.patch("/rate/:id", authMiddleware, rateBooking);

module.exports = router;