const jwt = require('jsonwebtoken'); 

const tokenGenerator = (user) => {
    const payload = {
        id: user.id,
        name: user.name,
        password: user.password,
        email: user.email,
        role: user.role
    };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    return {
        accessToken,
        refreshToken
    };
}



   

   