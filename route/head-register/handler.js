const bcrypt = require("bcrypt");
const Company = require("../../model/Company");
const User = require("../../model/User");
const ROLES = require("../../middleware/permission/static");
const express = require("express");
const router = express.Router();
const requestSchema = require('./schema');
const validate = require('../../utils/validator');

router.post('/',  validate(requestSchema), async (req, res) => {
    try {
        // Generate salt and hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const company = new Company({
            name: req.body.company_name,
            isPrivate: req.body.is_private
        })
        const savedCompany = await company.save();

        // Create new user
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            permissions: ROLES.head,
            company: savedCompany._id
        });

        // Save user to database
        await user.save();

        // Respond with success message
        res.json({ message: 'User registered successfully' });
    } catch (error) {
        // Handle error
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = router;