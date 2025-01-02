const jsonwebtoken = require("jsonwebtoken");
const dotenv = require("dotenv").config();
// admin authentication middleware

const authAdmin = async (req, res, next) => {
  try {
    const {atoken} = req.headers;
    if (!atoken) {
      res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const decoded = jsonwebtoken.verify(atoken, process.env.JWT_SECRET_KEY);
    console.log(decoded);
    if (decoded.email === process.env.ADMIN_EMAIL) {
      req.admin = decoded;
    } else {
      res.status(401).json({ success: false, message: "Unauthorized" });
    }
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

module.exports = authAdmin;
