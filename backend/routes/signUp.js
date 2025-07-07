const express = require('express');
const router = express.Router();
const createUserId = require('../controllers/createUserId');
const tokenGenerator = require('../controllers/tokenGenerator');
const userVerification = require('../controllers/userVerification');
const tokens = require('../../data/tokens');


    router.post('/', (req, res) => {
    const { name, email, password, address, phone } = req.body;

    const {emailVerified} = userVerification({email, password});
    if (emailVerified) {
        return res.status(400).json({ message: 'User already exists' });
    }
    // Create userId
    const userId = createUserId(name, email);

    // Create user object
    const newUser = {
        id: userId,
        name,
        email,
        password,
        address: address || '',
        phone: phone || '',
    };

    // Generate tokens
    const {accessToken,refreshToken} = tokenGenerator(newUser);

    tokens.push({
        id: newUser.id,
        refreshToken
    });

    res.cookie('refreshToken', refreshToken, {
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
            message: 'Login successful',
        });
} ) 

module.exports = router;