const jwt = require('jsonwebtoken'); 

const accessTokenGenerator = (user) => {
    if(!user || !user.id || !user.email || !user.password) {
        throw new Error("Invalid user object provided for access token generation");
        return null;
    }
    const payload = {
        id: user.id,
        name: user.name || "Anonymous",
        password: user.password,
        address: user.address || " ",
        email: user.email
    };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

    return accessToken
}

module.exports = accessTokenGenerator;


   

   