const jwt = require('jsonwebtoken');

const accessTokenGenerator = (user) => {
    const userObject = {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth  
    };
    const accessToken = jwt.sign(userObject, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m' // Access token valid for 15 minutes
    });
    return accessToken;
}

module.exports = accessTokenGenerator;