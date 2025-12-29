const express = require('express');
const router = express.Router();
const { submitSuggestion } = require('../controllers/suggestionController');

// @route   POST /api/suggestions
// @desc    Submit a suggestion
// @access  Public
router.post('/', submitSuggestion);

module.exports = router;
