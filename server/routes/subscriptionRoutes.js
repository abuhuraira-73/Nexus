const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getSubscription, upgradeSubscription } = require('../controllers/subscriptionController');

router.get('/', auth, getSubscription);
router.post('/upgrade', auth, upgradeSubscription);

module.exports = router;