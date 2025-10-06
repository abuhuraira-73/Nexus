const express = require('express');
const router = express.Router();
const { updateUserProfile, deleteUser, updateProfilePicture } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', authMiddleware, updateUserProfile);

// @route   POST /api/users/profile/picture
// @desc    Update user profile picture
// @access  Private
router.post('/profile/picture', authMiddleware, upload.single('profilePicture'), updateProfilePicture);

// @route   DELETE /api/users/me
// @desc    Delete user profile
// @access  Private
router.delete('/me', authMiddleware, deleteUser);

module.exports = router;
