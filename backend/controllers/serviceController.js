const Service = require("../models/Service");

exports.addService = async (
  req,
  res
) => {
  try {
    const service =
      await Service.create({
        barber: req.user.id,
        name: req.body.name,
        duration:
          req.body.duration,
        price: req.body.price,
      });

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getServices = async (
  req,
  res
) => {
  try {
    const services =
      await Service.find({
        barber: req.user.id,
      });

    res.json(services);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteService =
  async (req, res) => {
    try {
      await Service.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Service deleted",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };