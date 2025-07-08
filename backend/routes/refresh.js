const express = require('express');
const router = express.Router();
const accessTokenGenerator = require('../controllers/accessTokenGenerator');
const jwt = require('jsonwebtoken');


router.post('/', (req, res) => {
    const {refreshToken} = req.cookies;
    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }
    const info = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }
        //Get the user from the database
        // For demonstration, we assume a user object is retrieved from the database
        const accessToken = accessTokenGenerator(user);
        if (!accessToken) { 
            return res.status(500).json({ message: 'Failed to generate access token' });
        }
        const newRefreshToken = jwt.sign({ id: user.id, email: user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: true, // Use secure cookies in production
            sameSite: 'Strict', // Adjust as necessary
        });
        res.status(200).json({
            accessToken: accessToken,
            message: 'Access token generated successfully'
        });
    });
});


module.exports = router;