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
// CLIENT AUTHENTICATION CONTROLLERS
// ==========================================

exports.signup = async (req, res) => {
  try {
    // 🌟 Destructure parameters matching your frontend SignupScreen code
    const { name, phoneNumber, email, password } = req.body;

    if (!name || !phoneNumber || !password) {
      return res.status(400).json({ message: "Missing required profile registration parameters." });
    }

    // 🌟 Check for existing account profile via phone number anchor
    const exists = await User.findOne({ phoneNumber: phoneNumber.trim() });
    if (exists) {
      return res.status(400).json({
        message: "An account with this phone number already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      phoneNumber: phoneNumber.trim(),
      email: email ? email.trim().toLowerCase() : undefined,
      password: hashedPassword,
      role: "user", // Explicitly lock into client authorization level
      favorites: []
    });

    // Remove sensitive data before sending back user object context
    const userResponse = user.toObject();
    delete userResponse.password;

    const token = createToken(user);

    res.status(201).json({
      token,
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    // 🌟 Accept phoneNumber payload parameters from LoginScreen
    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
      return res.status(400).json({ message: "Phone number and password are required fields." });
    }

    const user = await User.findOne({ phoneNumber: phoneNumber.trim() });
    if (!user) {
      return res.status(400).json({ message: "Invalid phone number or password." });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ message: "Invalid phone number or password." });
    }

    const token = createToken(user);
    
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      token,
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================================
// FAVORITES MANAGEMENT
// ==========================================

exports.getFavoritesList = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User profile record not found." });
    }

    const favoriteIds = user.favorites || [];

    // Query across database collection checking matching references
    const populatedShops = await User.find({
      _id: { $in: favoriteIds }
    }).select("-password");

    res.json(populatedShops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.toggleFavorite = async (req, res) => {
  try {
    const { shopId } = req.params;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User profile record not found." });
    }

    if (!user.favorites) user.favorites = [];

    const shopIndex = user.favorites.indexOf(shopId);
    if (shopIndex > -1) {
      user.favorites.splice(shopIndex, 1);
    } else {
      user.favorites.push(shopId);
    }

    await user.save();
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================================
// PROFILE DATA OVERVIEWS
// ==========================================

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User account profile record could not be found.",
      });
    }

    res.status(200).json({
      success: true,
      user: {
        name: user.name || "Premium Client",
        email: user.email || "Not Provided",
        phoneNumber: user.phoneNumber,
        role: user.role
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};