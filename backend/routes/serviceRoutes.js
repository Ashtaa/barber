const express = require("express");
const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  addService,
  getServices,
  deleteService,
} = require("../controllers/serviceController");

router.post(
  "/",
  authMiddleware,
  addService
);

router.get(
  "/",
  authMiddleware,
  getServices
);

router.delete(
  "/:id",
  authMiddleware,
  deleteService
);

module.exports = router;