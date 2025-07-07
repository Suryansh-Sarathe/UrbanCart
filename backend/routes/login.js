const express = require('express');
const router = express.Router();
const userVerification = require('../controllers/userVerification');
const tokenGenerator = require('../controllers/tokenGenerator');
const tokens = require('../../data/tokens');

router.post('/', (req, res) => {
    const {email, password} = req.body;
    const {emailVerified,passwordVerified,userId} = userVerification({email, password});
    if (!emailVerified || !passwordVerified) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    else{
        const token = tokenGenerator({userId,email, password});
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].id === userId) {
                tokens[i].refreshToken = token.refreshToken;
            }
        }
        // Set cookies for access and refresh tokens
        res.cookie('accessToken', token.accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 15 * 60 * 1000 // 15 minutes
        });
        res.cookie('refreshToken', token.refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({
            message: 'Login successful',
        });
    }
});

module.exports = router;