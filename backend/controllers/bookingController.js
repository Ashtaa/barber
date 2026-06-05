const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      barber: req.body.barber,
      customer: req.user.id,
      customerName: req.body.customerName,
      service: req.body.service,
      servicePrice: req.body.servicePrice || 0,
      serviceDuration: req.body.serviceDuration || 30,
      bookingDate: req.body.bookingDate,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      barber: req.user.id,
    })
      .populate("customer", "name email")
      .sort({ bookingDate: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.completeBooking = async (req, res) => {
  try {
    const booking =
      await Booking.findByIdAndUpdate(
        req.params.id,
        {
          status: "completed",
        },
        {
          new: true,
        }
      );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking =
      await Booking.findByIdAndUpdate(
        req.params.id,
        {
          status: "cancelled",
          cancellationReason:
            req.body.reason || "",
        },
        {
          new: true,
        }
      );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.rateBooking = async (req, res) => {
  try {
    const { rating, review } = req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message:
          "Rating must be between 1 and 5",
      });
    }

    const booking =
      await Booking.findByIdAndUpdate(
        req.params.id,
        {
          rating,
          review,
        },
        {
          new: true,
        }
      );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      customer: req.user.id,
    })
      .populate("barber")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};