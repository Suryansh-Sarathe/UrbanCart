const jwt = require('jsonwebtoken');
const accessTokenGenerator = require('./accessTokenGenerator');
const user = require('../../models/main').user;

const tokenVerification = (accessToken, refreshToken) => {
    try {
        // Verify the access token
        const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        
        // If access token is valid, return the decoded user information
        return {
            valid: true,
            user: decodedAccessToken
        };
    } catch (error) {
        // If access token is invalid or expired, check the refresh token
        if (refreshToken) {
            try {
                const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
                
                // Generate a new access token using the user information from the refresh token
                const userId = decodedRefreshToken._id;
                const userInfo = user.findById(userId);
                const newAccessToken = accessTokenGenerator(userInfo);
                
                return {
                    valid: false,
                    newAccessToken: newAccessToken,
                    userId: decodedRefreshToken.id
                };
            } catch (refreshError) {
                return { valid: false, error: 'Invalid refresh token' };
            }
        }
        return { valid: false, error: 'Invalid access token' };
    }
}