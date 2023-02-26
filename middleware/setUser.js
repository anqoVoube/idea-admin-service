const User = require('../model/User');
const jwt = require("jsonwebtoken");

function userSetter(req, res, next) {
    // Get the user ID from the cookie
    if (req.cookies.accessToken) {
        const token = req.cookies.accessToken;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const user = User.findById(userId);
        if (user) {
            req.user = user
        }
    }
    next()
}


module.exports = userSetter;