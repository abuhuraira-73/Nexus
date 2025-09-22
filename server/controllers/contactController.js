const Contact = require('../models/Contact');

const submitContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    if (!name || !email || !message) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();

    res.status(201).json({ msg: 'Message received! Thank you for contacting us.' });

  } catch (err) {
    console.error('Error submitting contact form:', err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { submitContactForm };
