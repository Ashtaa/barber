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
exports.getServices = async (req, res) => {
  try {
    let filter = {};

    // 1. If a customer passes ?barber=ID in the URL, filter by that specific barber
    if (req.query.barber) {
      filter.barber = req.query.barber;
    } else {
      // 2. Fallback for the Barber App managing their own catalog items
      filter.barber = req.user.id;
    }

    const services = await Service.find(filter);
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