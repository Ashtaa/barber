const express = require("express");
const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  createBooking,
  getBookings,
  completeBooking,
  cancelBooking,
  rateBooking,
  getMyBookings,
} = require(
  "../controllers/bookingController"
);

router.post(
  "/",
  authMiddleware,
  createBooking
);

router.get(
  "/barber",
  authMiddleware,
  getBookings
);

router.get(
  "/my-bookings",
  authMiddleware,
  getMyBookings
);

router.patch(
  "/complete/:id",
  authMiddleware,
  completeBooking
);

router.patch(
  "/cancel/:id",
  authMiddleware,
  cancelBooking
);

router.patch(
  "/rate/:id",
  authMiddleware,
  rateBooking
);

module.exports = router;