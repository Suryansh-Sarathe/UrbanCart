const {user} = require('../../models/main');
const {hashPassword, addSaltToPassword} = require('../controllers/main');
const {accessTokenGenerator,refreshTokenGenerator,passwordVerification} = require('../controllers/main');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const {email, password} = req.body;

    // Check if user exists
    const existingUser = await user.findOne({email:email});
    if (!existingUser) {
        return res.status(400).json({error: 'User does not exist'});
    }
    try{
        saltedPassword = await addSaltToPassword(password);

        const isValidPassword = await passwordVerification(saltedPassword, existingUser.password);
        if (!isValidPassword) {
            return res.status(400).json({error: 'Invalid password'});
        }
    }
    catch (error) {
        return res.status(500).json({error: 'Error verifying password'});
    }
    // Generate access and refresh tokens
    const accessToken = accessTokenGenerator(existingUser);
    const refreshToken = refreshTokenGenerator(existingUser._id);

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        maxAge: 15 * 60 * 1000 // 15 minutes
    });
    res.status(200).json({
        message: 'Login successful',
        accessToken,
        user: {
            id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email,
        }
    });
    
});

module.exports = router;