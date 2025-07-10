const {accessTokenGenerator,refreshTokenGenerator} = require('../controllers/main');
const express = require('express');
const router = express.Router();
const {verifyRefreshToken} = require('../controllers/main');
const {User} = require('../models/main');

router.post('/', async (req, res) => {
    const {refreshToken} = req.body;

    if (!refreshToken) {
        res.redirect('/login');
        return;
    }
    try {
        // Verify the refresh token
        const userId = await verifyRefreshToken(refreshToken);
        
        if (!userId) {
            res.redirect('/login');
            return;
        }
        // Find the user by ID
        const user = await User.findById(userId);
        const accessToken = accessTokenGenerator(user);
        const newRefreshToken = refreshTokenGenerator(userId);

        res.status(200).json({
            message: 'Access token refreshed successfully',
            accessToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        });
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 15 * 60 * 1000 // 15 minutes
        });

    } catch (error) {
        console.error('Error refreshing access token:', error);
        res.status(500).json({error: 'Failed to refresh access token'});
    }
});

module.exports = router;
