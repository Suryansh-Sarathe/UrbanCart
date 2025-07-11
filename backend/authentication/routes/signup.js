const {user} = require('../../models/main');
const {hashPassword, addSaltToPassword} = require('../controllers/main');
const {accessTokenGenerator, refreshTokenGenerator} = require('../controllers/main');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const {name, email, password, gender, dateOfBirth, address, phone, createdAt, updatedAt} = req.body;

    // Check if user already exists
    const existingUser = await user.findOne({email:email})
    if (existingUser) {
        return res.status(400).json({error: 'User already exists'});
    }
    try {
        const saltedPassword = addSaltToPassword(password);
        
        const hashedPassword = await hashPassword(saltedPassword);
        
        if (!hashedPassword) {
            return res.status(500).json({error: 'Error hashing password'});
        }
        const newUser = new user({
            name,
            email,
            password: hashedPassword,
            gender,
            dateOfBirth,
            address: {
                street: address.street,
                city: address.city,
                state: address.state,
                pinCode: address.pinCode,
                country: address.country
            },
            phone,
            createdAt: createdAt || new Date(),
            updatedAt: updatedAt || new Date()
        });
        
        // Save user to database
        await newUser.save();
        
        // Generate access and refresh tokens
        const accessToken = accessTokenGenerator(newUser);
        const refreshToken = refreshTokenGenerator(newUser._id);
        
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false, // Set to true if using HTTPS
            maxAge: 15 * 60 * 1000 // 15 minutes
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false, // Set to true if using HTTPS
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.status(201).json({
            message: 'User created successfully',
            accessToken,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            }
        });
        
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

module.exports = router;