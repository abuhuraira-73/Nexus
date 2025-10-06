const User = require('../models/User');
const Canvas = require('../models/Canvas'); // Import Canvas model
const bcrypt = require('bcryptjs');

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
const updateUserProfile = async (req, res) => {
    const { name, preferences } = req.body;

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Update fields
        if (name) {
            user.name = name;
        }
        if (preferences) {
            user.preferences = { ...user.preferences, ...preferences };
        }

        await user.save();

        // Return user data without the password
        res.json({
            id: user._id, // Changed from _id
            name: user.name,
            email: user.email,
            provider: user.provider,
            avatarUrl: user.avatarUrl,
            preferences: user.preferences,
            plan: user.plan,
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   POST /api/users/profile/picture
// @desc    Update user profile picture
// @access  Private
const updateProfilePicture = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (!req.file) {
            return res.status(400).json({ msg: 'No file uploaded.' });
        }

        user.avatarUrl = `/uploads/${req.file.filename}`;

        await user.save();

        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            provider: user.provider,
            avatarUrl: user.avatarUrl,
            preferences: user.preferences,
            plan: user.plan,
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   DELETE /api/users/profile/picture
// @desc    Remove user profile picture
// @access  Private
const removeProfilePicture = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Optional: Delete the old file from the filesystem
        if (user.avatarUrl) {
            const fs = require('fs');
            const path = require('path');
            const oldPath = path.join(__dirname, '..', 'public', user.avatarUrl);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }

        user.avatarUrl = null;
        await user.save();

        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            provider: user.provider,
            avatarUrl: user.avatarUrl,
            preferences: user.preferences,
            plan: user.plan,
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// @route   DELETE /api/users/me
// @desc    Delete user, their canvases, & profile
// @access  Private
const deleteUser = async (req, res) => {
    const { password } = req.body;
    const userId = req.user.id;

    try {
        const user = await User.findById(userId).select('+password');

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // For local accounts, verify password before deletion
        if (user.provider === 'local') {
            if (!password) {
                return res.status(400).json({ msg: 'Password is required for deletion.' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ msg: 'Incorrect password.' });
            }
        }

        // Delete all canvases owned by the user
        await Canvas.deleteMany({ user: userId });

        // Delete the user
        await User.findByIdAndDelete(userId);

        res.json({ msg: 'Your account and all associated data have been permanently deleted.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = { updateUserProfile, updateProfilePicture, deleteUser, removeProfilePicture };
