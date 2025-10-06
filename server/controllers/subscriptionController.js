const User = require('../models/User');

// @desc    Get user's subscription status
// @route   GET /api/subscription
// @access  Private
const getSubscription = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json({ plan: user.plan });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// @desc    Mock endpoint to upgrade a user to premium
// @route   POST /api/subscription/upgrade
// @access  Private
const upgradeSubscription = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.plan = 'premium';
        await user.save();
        res.json({ plan: user.plan, message: 'Successfully upgraded to Premium!' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = { getSubscription, upgradeSubscription };