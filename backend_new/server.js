const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/mongoDb");
const adminRouter = require("./routes/adminRoute");
// app configurations

const app = express();
const port = process.env.PORT || 4000;

// mongodb configurations

connectDB();
// middleware
app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api/admin", adminRouter); // admin routes

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
