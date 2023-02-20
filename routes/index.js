const express = require('express');
const router = express.Router();

// Import your route handlers
const loginRoute = require('./login');
const registerRoute = require('./register');
const userRoute = require('./user');

// Register your route handlers with the router
router.use('/login', loginRoute);
router.use('/register', registerRoute);
router.use('/user', userRoute);

module.exports = router;