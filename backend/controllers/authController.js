const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET || "SUPER_SECRET_KEY",
    {
      expiresIn: "30d",
    }
  );
};

// ==========================================
// AUTHENTICATION ENGINE CONTROLLERS
// ==========================================

exports.signup = async (req, res) => {
  try {
    const { shopName, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      shopName,
      email,
      password: hashedPassword,
      favorites: [] // Ensure favorites array initializes clean
    });

    const token = createToken(user);

    res.status(201).json({
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = createToken(user);

    res.json({
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================================
// POPULATED FAVORITES MANAGEMENT CONTROLLERS
// ==========================================

// @desc    Get logged in user's completely populated favorites document profiles
// @route   GET /api/auth/favorites-list
// @access  Private (Injected by authMiddleware)
exports.getFavoritesList = async (req, res) => {
  try {
    // 1. Fetch the user profile making the request
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: "User profile record not found" });
    }

    const favoriteIds = user.favorites || [];

    // 2. ✅ FIXED: Look up the complete barber documentation matching saved ID strings
    // This pulls names, images, and hours arrays so your frontend FlatList can render cards.
    const populatedShops = await User.find({
      _id: { $in: favoriteIds }
    }).select("-password"); // Safeguard security context by filtering out hash data

    res.json(populatedShops);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc    Toggle targeted shop ID within user's relational bookmark record field
// @route   POST /api/auth/favorite/:shopId
// @access  Private (Injected by authMiddleware)
exports.toggleFavorite = async (req, res) => {
  try {
    const { shopId } = req.params;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User profile record not found" });
    }

    if (!user.favorites) {
      user.favorites = [];
    }

    // Determine if target item reference already exists in relational payload fields
    const shopIndex = user.favorites.indexOf(shopId);

    if (shopIndex > -1) {
      // Exist? Splice it out to remove the favorite bookmark reference
      user.favorites.splice(shopIndex, 1);
    } else {
      // Absent? Append ID string to record bookmark status
      user.favorites.push(shopId);
    }

    await user.save();
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};