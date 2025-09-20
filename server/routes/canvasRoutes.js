const express = require('express');
const router = express.Router();
const { createCanvas, getCanvases } = require('../controllers/canvasController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST /api/canvases
// @desc    Create a new canvas
// @access  Private
router.post('/', authMiddleware, createCanvas);

// @route   GET /api/canvases
// @desc    Get all canvases for a user
// @access  Private
router.get('/', authMiddleware, getCanvases);

module.exports = router;
