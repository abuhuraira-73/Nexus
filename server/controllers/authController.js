const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password,
        });

        await user.save();

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5d' },
            (err, token) => {
                if (err) throw err;
                                res.status(201).json({
                                    token,
                                    user: {
                                        id: user.id,
                                        name: user.name,
                                        email: user.email,
                                    },
                                });
                            } );
                    } catch (err) {
                        console.error(err);
                        res.status(500).send('Server error');
                    }};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

    try {
        let user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5d' },
            (err, token) => {
                if (err) throw err;
                res.json({ 
                    token, 
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    },
                });
            } );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = { registerUser, loginUser };