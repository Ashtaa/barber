const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getAllBarbers, // Imported public discovery controller
  getProfile,
  updateProfile,
} = require("../controllers/barberController");

// @route   GET /api/barber
// @desc    Public route for the customer app to fetch all available barber shops
router.get(
  "/", 
  getAllBarbers
);

// @route   GET /api/barber/profile
// @desc    Private route for a barber to fetch their own shop settings
router.get(
  "/profile",
  authMiddleware,
  getProfile
);

// @route   PUT /api/barber/profile
// @desc    Private route for a barber to save their shop settings/images
router.put(
  "/profile",
  authMiddleware,
  updateProfile
);

module.exports = router;