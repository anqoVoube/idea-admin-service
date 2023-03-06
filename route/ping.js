const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    console.log("pinged")
    res.json({ message: 'Pong' });
});

module.exports = router;