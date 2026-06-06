const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// Destructure controllers from updated file
const { signup, login, getFavoritesList, toggleFavorite } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);

// ✅ Add these matching hooks to destroy the 404 handler drops
router.get("/favorites-list", authMiddleware, getFavoritesList);
router.post("/favorite/:shopId", authMiddleware, toggleFavorite);

module.exports = router;