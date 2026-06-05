const User = require("../models/User");

exports.getProfile =
  async (req, res) => {
    try {
      const barber =
        await User.findById(
          req.user.id
        );

      res.json(barber);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

exports.updateProfile =
  async (req, res) => {
    try {
      if (
        req.body.images &&
        req.body.images.length >
          3
      ) {
        return res
          .status(400)
          .json({
            message:
              "Maximum 3 images allowed",
          });
      }

      const barber =
        await User.findByIdAndUpdate(
          req.user.id,
          req.body,
          {
            new: true,
          }
        );

      res.json(barber);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };