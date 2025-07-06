const jwt = require('jsonwebtoken');
const app = require('express');
const router = app.Router();
const createUserId = require('../controllers/createUserId');
const tokenGenerator = require('../controllers/tokenGenerator');
const userVerification = require('../controllers/userVerification');
const tokens = require('../../data/tokens');

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

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
        address: address || 'Enter your address',
        phone: phone || 'Enter your phone number',
        role: 'user'
    };

    // Generate tokens
    const {accessToken,refreshToken} = tokenGenerator(newUser);

    tokens.push({
        id: newUser.id,
        refreshToken
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true, // Use secure cookies in production
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    res.status(201).json({
        message: 'User created successfully',
        user: newUser,
        accessToken
    });
} )