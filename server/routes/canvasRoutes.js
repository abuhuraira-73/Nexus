const express = require('express');
const router = express.Router();
const { createCanvas, getCanvases, getCanvasById } = require('../controllers/canvasController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST /api/canvases
// @desc    Create a new canvas
// @access  Private
router.post('/', authMiddleware, createCanvas);

// @route   GET /api/canvases
// @desc    Get all canvases for a user
// @access  Private
router.get('/', authMiddleware, getCanvases);

// @route   GET /api/canvases/:id
// @desc    Get a canvas by ID
// @access  Private
router.get('/:id', authMiddleware, getCanvasById);

module.exports = router;
