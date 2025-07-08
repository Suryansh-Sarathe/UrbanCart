const jwt = require('jsonwebtoken');

const tokenVerification = (req, res, next) => {
    const token = req.cookies.accessToken || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token is required' });
    }  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid access token' });
        }
        req.user = decoded; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    });
}

module.exports = tokenVerification;