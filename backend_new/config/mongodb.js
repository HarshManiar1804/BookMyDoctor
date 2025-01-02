const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("Database Connected"));
  await mongoose.connect(`${process.env.MONGODB_URI}/bookmydoctor`);
};

module.exports = connectDB ;
