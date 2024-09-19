// routes/fileRoutes.js

const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

// Route for the file picker page
router.get('/', fileController.getFilePicker);

module.exports = router;
