const accessTokenGenerator = require('./accessTokenGenerator');
const refreshTokenGenerator = require('./refreshTokenGenerator');
const tokenVerification = require('./tokenVerification');
const hashPassword = require('./hashPassword');
const passwordVerification = require('./passwordVerification');
const addSaltToPassword = require('./addSaltToPassword');
const { verify } = require('jsonwebtoken');

module.exports = {
    accessTokenGenerator,
    refreshTokenGenerator,
    hashPassword,
    passwordVerification,
    addSaltToPassword,
    verifyAccessToken,
    verifyRefreshToken
};