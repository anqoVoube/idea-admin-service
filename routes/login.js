const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');


router.post('/login', async (req, res) => {
    try {
        // Find user by username
        const user = await User.findOne({ username: req.body.username });

        // Check if user exists
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Create payload for access token
        const accessTokenPayload = {
            userId: user._id,
            username: user.username
        };

        // Create access token with expiration time of 15 minutes
        const accessToken = jwt.sign(
            accessTokenPayload,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        // Create payload for refresh token
        const refreshTokenPayload = {
            userId: user._id,
            tokenVersion: user.tokenVersion
        };

        // Create refresh token with expiration time of 7 days
        const refreshToken = jwt.sign(
            refreshTokenPayload,
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        );

        // // Update user's token version in database
        // user.tokenVersion += 1;
        // await user.save();

        // Send access and refresh tokens as cookies
        res.cookie('accessToken', accessToken, { httpOnly: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true });

        // Respond with success message
        res.json({ message: 'Login successful' });
    } catch (error) {
        // Handle error
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = router;