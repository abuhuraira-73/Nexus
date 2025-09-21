const mongoose = require('mongoose');

const CanvasSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Canvas name is required'],
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  data: {
    type: Object,
    default: {},
  },
  status: {
    type: String,
    enum: ['active', 'trashed', 'archived'],
    default: 'active',
  },
}, { timestamps: true });

module.exports = mongoose.model('Canvas', CanvasSchema);
