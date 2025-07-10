const jwt = require('jsonwebtoken');

const refreshTokenGenerator = (userId) => {
    // Generate a refresh token using the user's ID and a secret key
    const refreshToken = jwt.sign({_id : userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d' // Refresh token valid for 7 days
    });
    return refreshToken;
};
module.exports = refreshTokenGenerator;