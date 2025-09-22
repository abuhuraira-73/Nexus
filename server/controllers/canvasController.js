const Canvas = require('../models/Canvas');

// @route   GET /api/canvases
// @desc    Get all canvases for a user
// @access  Private
const getCanvases = async (req, res) => {
  try {
    const canvases = await Canvas.find({ user: req.user.id, status: 'active' }).sort({ updatedAt: -1 });
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
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(canvas);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   PUT /api/canvases/:id
// @desc    Update a canvas
// @access  Private
const updateCanvas = async (req, res) => {
  const { name, data, backgroundColor, backgroundPattern } = req.body;

  try {
    let canvas = await Canvas.findById(req.params.id);

    if (!canvas) {
      return res.status(404).json({ msg: 'Canvas not found' });
    }

    // Ensure the user owns the canvas
    if (canvas.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Update fields
    if (name) canvas.name = name;
    if (data) canvas.data = data;
    if (backgroundColor) canvas.backgroundColor = backgroundColor;
    if (backgroundPattern) canvas.backgroundPattern = backgroundPattern;

    canvas = await canvas.save();

    res.json(canvas);
  } catch (err) {
    console.error('--- ERROR IN updateCanvas ---', err.message);
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Canvas not found' });
    }
    res.status(500).send('Server Error');
  }
};

// @route   GET /api/canvases/trash
// @desc    Get all trashed canvases for a user
// @access  Private
const getTrashedCanvases = async (req, res) => {
  try {
    const canvases = await Canvas.find({ user: req.user.id, status: 'trashed' }).sort({ updatedAt: -1 });
    res.json(canvases);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   PATCH /api/canvases/:id/status
// @desc    Update canvas status (trash, restore, etc.)
// @access  Private
const updateCanvasStatus = async (req, res) => {
  const { status } = req.body;

  // Validate status
  const allowedStatuses = ['active', 'trashed', 'archived'];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ msg: 'Invalid status update.' });
  }

  try {
    let canvas = await Canvas.findById(req.params.id);

    if (!canvas) {
      return res.status(404).json({ msg: 'Canvas not found' });
    }

    if (canvas.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    canvas.status = status;
    await canvas.save();

    res.json(canvas);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { 
    createCanvas, 
    getCanvases, 
    getCanvasById, 
    updateCanvas, 
    getTrashedCanvases, 
    updateCanvasStatus 
};