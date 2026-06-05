const mongoose = require("mongoose");
const dns = require("node:dns");

// Force Google DNS
dns.setServers([
  "8.8.8.8",
  "8.8.4.4",
]);

mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI ||
      "mongodb://127.0.0.1:27017/barberDB",
      {
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
      }
    );

    console.log(
      "✅ MongoDB Connected via Custom DNS"
    );
  } catch (error) {
    console.error(
      "❌ MongoDB Connection Error:",
      error
    );

    process.exit(1);
  }
};

module.exports = connectDB;