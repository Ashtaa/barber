const User = require("../models/User");

// @desc    Get all registered barber shops for the customer discovery feed
// @route   GET /api/barber
// @access  Public
exports.getAllBarbers = async (req, res) => {
  try {
    // Find all database entries where role is explicitly 'barber'
    // Exclude the password field for system safety
    const barbers = await User.find({ role: "barber" }).select("-password");
    
    // Return the array directly to match your frontend FlatList expects
    res.json(barbers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc    Get the current logged-in barber's own profile config
// @route   GET /api/barber/profile
// @access  Private (Requires Token via AuthMiddleware)
exports.getProfile = async (req, res) => {
  try {
    const barber = await User.findById(req.user.id);
    res.json(barber);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc    Update the current logged-in barber's profile metadata
// @route   PUT /api/barber/profile
// @access  Private (Requires Token via AuthMiddleware)
exports.updateProfile = async (req, res) => {
  try {
    if (req.body.images && req.body.images.length > 3) {
      return res.status(400).json({
        message: "Maximum 3 images allowed",
      });
    }

    const barber = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      {
        new: true, // Returns the newly modified document instead of the old one
      }
    );

    res.json(barber);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};