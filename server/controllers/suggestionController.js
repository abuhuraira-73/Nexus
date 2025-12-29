const Suggestion = require('../models/Suggestion');

const submitSuggestion = async (req, res) => {
  const { name, rating, comment } = req.body;

  try {
    if (!rating || !comment) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    const newSuggestion = new Suggestion({
      name,
      rating,
      comment,
    });

    await newSuggestion.save();

    res.status(201).json({ msg: 'Suggestion received! Thank you for your feedback.' });

  } catch (err) {
    console.error('Error submitting suggestion form:', err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { submitSuggestion };
