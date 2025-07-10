const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.clearCookie('accessToken', { httpOnly: true, secure: true });
    res.clearCookie('refreshToken', { httpOnly: true, secure: true });

    res.redirect('/login');
});

module.exports = router;