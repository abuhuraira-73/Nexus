const Canvas = require('../models/Canvas');

// @route   GET /api/canvases
// @desc    Get all canvases for a user
// @access  Private
const getCanvases = async (req, res) => {
  try {
    const canvases = await Canvas.find({ user: req.user.id }).sort({ updatedAt: -1 });
    res.json(canvases);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   GET /api/canvases/:id
// @desc    Get a single canvas by ID
// @access  Private
const getCanvasById = async (req, res) => {
  try {
    const canvas = await Canvas.findById(req.params.id);

    if (!canvas) {
      return res.status(404).json({ msg: 'Canvas not found' });
    }

    // Ensure the user owns the canvas
    if (canvas.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    res.json(canvas);
  } catch (err) {
    console.error(err.message);
    // If the ID format is invalid, it will throw an error
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Canvas not found' });
    }
    res.status(500).send('Server Error');
  }
};


// @route   POST /api/canvases
// @desc    Create a new canvas
// @access  Private
const createCanvas = async (req, res) => {
  const { name } = req.body;
  const userId = req.user.id;

  if (!name) {
    return res.status(400).json({ msg: 'Canvas name is required' });
  }

  try {
    const newCanvas = new Canvas({
      name,
      user: userId,
      data: {}, // Start with an empty canvas
    });

    const canvas = await newCanvas.save();
    res.status(201).json(canvas);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { createCanvas, getCanvases, getCanvasById };
