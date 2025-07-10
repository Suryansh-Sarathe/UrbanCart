const express = require('express');
const router = express.Router();
const { user } = require('../../models/main');
const { verifyAccessToken } = require('../controllers/main');

router.delete('/', async (req, res) => {
    const { userId } = req.body;

    // Verify the access token
    const verifiedUser = await verifyAccessToken(req.cookies.accessToken);
    if (!verifiedUser) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // Check if the user exists
    const existingUser = await user.findById(userId);
    if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Delete the user
    await user.findByIdAndDelete(userId);

    res.status(200).json({ message: 'User deleted successfully' });
});

module.exports = router;