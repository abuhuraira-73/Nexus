const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    required: [true, 'Please add a rating'],
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: [true, 'Please add a comment'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Suggestion', suggestionSchema);
