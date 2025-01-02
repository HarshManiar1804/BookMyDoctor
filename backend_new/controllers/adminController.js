// api for adding doctor
const validator = require("validator");
const bcrypt = require("bcrypt");
const doctorModel = require("../models/doctorModel");
const cloudinary = require("../config/cloudnary");
const dotenv = require("dotenv").config();
const jsonwebtoken = require("jsonwebtoken");
//add doctor to database
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;

    // check if all fields are filled
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address ||
      !imageFile
    ) {
      res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    // validate email
    if (!validator.isEmail(email)) {
      res.status(400).json({ success: false, message: "Invalid email" });
    }

    // validate password
    if (password.length < 8) {
      res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }
    // hashing doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    // add doctor to database
    const doctorData = {
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res
      .status(200)
      .json({ success: true, message: "Doctor added successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Internal server error" });
  }
};

//API for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jsonwebtoken.sign(
        { email: email, password: password },
        process.env.JWT_SECRET_KEY
      );
      res
        .status(200)
        .json({
          success: true,
          token: token,
          message: "Admin logged in successfully",
        });
    } else {
      res.status(400).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {}
};

module.exports = { addDoctor, loginAdmin };


// admin token - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGJvb2tteWRvY3Rvci5jb20iLCJwYXNzd29yZCI6ImJvb2t5bXlkb2N0b3JAYWRtaW4iLCJpYXQiOjE3MzU4MTc0MDN9.KEhFl-PnGl2mroDODW_fAfno12vD_y2nDr_MOx7AqZg