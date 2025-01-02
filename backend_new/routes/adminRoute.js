const express = require('express');
const {addDoctor , loginAdmin} = require('../controllers/adminController');
const { upload } = require('../middleware/multer');
const authAdmin = require('../middleware/authAdmin');

const adminRouter = express.Router();

// api for adding doctor
adminRouter.post('/add-doctor',authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/login', loginAdmin);
module.exports = adminRouter;