const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// 1. Ensure getProfile is imported from your controller!
const { 
  signup, 
  login, 
  getFavoritesList, 
  toggleFavorite, 
  getProfile 
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.get("/favorites-list", authMiddleware, getFavoritesList);
router.post("/favorite/:shopId", authMiddleware, toggleFavorite);

// 2. 🚨 ADD THIS LINE BELOW IF IT IS MISSING:
router.get("/profile", authMiddleware, getProfile);

module.exports = router;