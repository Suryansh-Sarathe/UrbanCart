const jwt = require('jsonwebtoken');

const verifyAccessToken = (token) => {
    try {
        // Verify the access token using the secret key
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        return decoded; // Return the decoded token if verification is successful
    } catch (error) {
        // If verification fails, return null or throw an error
        return null;
    }
}

module.exports = verifyAccessToken;