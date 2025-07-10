const jwt = require('jsonwebtoken');

const verifyRefreshToken = (token) => {
    try {
        // Verify the refresh token using the secret key
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        return decoded; // Return the decoded token if verification is successful
    } catch (error) {
        console.error('Token verification failed:', error);
        // If verification fails, return null or throw an error
        return null;
    }
}
module.exports = verifyRefreshToken;