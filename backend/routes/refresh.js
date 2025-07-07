const express = require('express');
const router = express.Router();
const tokens = require('../../data/tokens');
const tokenGenerator = require('../controllers/tokenGenerator');

router.post('/', (req, res) => {
    const {id,refreshToken} = req.body;
    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }
    else{
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].id === id && tokens[i].refreshToken === refreshToken) {
                const tokensObj = tokenGenerator({userId: id, name: "User", password: "defaultPassword", email: " " });
                res.cookie('accessToken', tokensObj.accessToken, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 15 * 60 * 1000 // 15 minutes
                });
                return res.status(200).json({
                    message: 'Access token refreshed successfully',
                    accessToken: tokensObj.accessToken
                });
            }
        }
    }
    res.status(400).json({ message: 'Invalid refresh token' });
})

module.exports = router;