const express = require('express');
const router = express.Router();

const { loginCtl, signupCtl } = require('./auth/auth.controller');
const { verifyAuth } = require('../config/token');
const { getUser } = require('./user/user.controller');

// Auth router
router.post('/login', loginCtl);
router.post('/signup', signupCtl);

// User router
router.get('/user', verifyAuth, getUser);

module.exports = router;