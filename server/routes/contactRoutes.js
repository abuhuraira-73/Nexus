const express = require('express');
const router = express.Router();
const { submitContactForm } = require('../controllers/contactController');

// @route   POST /api/contact
// @desc    Submit a contact form message
// @access  Public
router.post('/', submitContactForm);

module.exports = router;
