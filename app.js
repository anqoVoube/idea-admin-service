const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const routes = require('./routes');

// Register the routes with the app
// Middleware to parse JSON request body
app.use(express.json());
app.use('/', routes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
