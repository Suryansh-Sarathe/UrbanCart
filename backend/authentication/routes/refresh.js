const {accessTokenGenerator,refreshTokenGenerator} = require('../controllers/main');
const express = require('express');
const router = express.Router();
const {verifyRefreshToken} = require('../controllers/main');
const {user} = require('../../models/main');

router.post('/', async (req, res) => {
    const {refreshToken} = req.body;

    if (!refreshToken) {
        res.redirect('/login');
        return;
    }
    try {
        // Verify the refresh token
        const tokenDecoded = await verifyRefreshToken(refreshToken);
        
        if (!tokenDecoded) {
            res.redirect('/login');
            return;
        }
        // Find the user by ID
        const newUser = await user.findById(tokenDecoded._id);
        const accessToken = accessTokenGenerator(newUser);
        const newRefreshToken = refreshTokenGenerator(tokenDecoded._id);

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
        res.status(200).json({
            message: 'Access token refreshed successfully',
            accessToken,
            user: {
                id: tokenDecoded._id,
                username: user.username,
                email: user.email,
            }
        });

    } catch (error) {
        console.error('Error refreshing access token:', error);
        res.status(500).json({error: 'Failed to refresh access token'});
    }
});

module.exports = router;
