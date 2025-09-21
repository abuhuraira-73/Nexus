const express = require('express');
const router = express.Router();
const {
    createCanvas,
    getCanvases,
    getCanvasById,
    updateCanvas,
    getTrashedCanvases,
    updateCanvasStatus
} = require('../controllers/canvasController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST /api/canvases
// @desc    Create a new canvas
// @access  Private
router.post('/', authMiddleware, createCanvas);

// @route   GET /api/canvases
// @desc    Get all canvases for a user
// @access  Private
router.get('/', authMiddleware, getCanvases);

// @route   GET /api/canvases/trash
// @desc    Get trashed canvases for a user
// @access  Private
router.get('/trash', authMiddleware, getTrashedCanvases);

// @route   GET /api/canvases/:id
// @desc    Get a canvas by ID
// @access  Private
router.get('/:id', authMiddleware, getCanvasById);

// @route   PUT /api/canvases/:id
// @desc    Update a canvas
// @access  Private
router.put('/:id', authMiddleware, updateCanvas);

// @route   PATCH /api/canvases/:id/status
// @desc    Update canvas status
// @access  Private
router.patch('/:id/status', authMiddleware, updateCanvasStatus);

module.exports = router;