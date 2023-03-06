const express = require('express');
const router = express.Router();

// Import your route handlers
const loginRoute = require('./login');
const employeeRegisterRoute = require('./employee-register/handler');
const headRegisterRoute = require('./head-register/handler');
const userRoute = require('./user');
const pingRoute = require('./ping');

// Register your route handlers with the router
router.use('/login', loginRoute);
router.use('/employee-register', employeeRegisterRoute);
router.use('/user', userRoute);
router.use('/ping', pingRoute);
router.use('/head-register', headRegisterRoute);

module.exports = router;