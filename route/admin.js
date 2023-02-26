const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/User');
const Company = require('../model/Company');
const isAuthenticated = require('../middleware/permission/isAuthenticated')
const hasPermission = require('../middleware/permission/role')
const ROLES = require('../middleware/permission/static')


router.post('/', isAuthenticated, hasPermission(ROLES.superUser), async (req, res) => {
    try {
        // Generate salt and hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const company = new Company({
            name: req.body.company_name
        })
        const savedCompany = await company.save();
        // Create new user
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            company: savedCompany._id
        });

        // Save user to database
        const savedUser = await user.save();

        // Respond with success message
        res.json({ message: 'User registered successfully' });
    } catch (error) {
        // Handle error
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = router;