const deleteUser = require('./delete');
const login = require('./login');
const logout = require('./logout');
const refresh = require('./refresh');
const signup = require('./signup');

const router = require('express').Router();

router.use('/signup', signup);
router.use('/login', login);    
router.use('/logout', logout);
router.use('/refresh', refresh);
router.use('/delete', deleteUser);

module.exports = router;