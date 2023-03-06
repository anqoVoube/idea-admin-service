const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../model/User');
const requestSchema = require('./schema');
const validate = require('../../utils/validator');

router.post('/', validate(requestSchema), async (req, res) => {
    try {
        // Generate salt and hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create new user
        const user = new User({
            username: req.body.username,
            password: hashedPassword
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