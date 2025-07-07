const jwt = require('jsonwebtoken'); 

const tokenGenerator = (user) => {
    const payload = {
        id: user.id,
        name: user.name || "User",
        password: user.password || "defaultPassword",
        email: user.email || " ",
    };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || "Mysecret", { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET || "yourSecret", { expiresIn: '7d' });

    return {
        accessToken,
        refreshToken
    };
}

module.exports = tokenGenerator;


   

   