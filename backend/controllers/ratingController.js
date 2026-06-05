const Rating = require("../models/Rating");

exports.addRating = async (
  req,
  res
) => {
  try {
    const rating =
      await Rating.create({
        barber:
          req.body.barber,
        stars:
          req.body.stars,
      });

    res.status(201).json(
      rating
    );
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

exports.getRatingPercentage =
  async (req, res) => {
    try {
      const ratings =
        await Rating.find({
          barber:
            req.params.barberId,
        });

      const total =
        ratings.reduce(
          (
            sum,
            rating
          ) =>
            sum +
            rating.stars,
          0
        );

      const percentage =
        ratings.length === 0
          ? 100
          : Math.round(
              (total /
                (ratings.length *
                  5)) *
                100
            );

      res.json({
        percentage,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };