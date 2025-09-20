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

module.exports = { createCanvas, getCanvases };
