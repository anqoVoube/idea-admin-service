function authUser(req, res, next) {
    if (req.user == null) {
        res.status(403)
        return res.json({message: 'You need to sign in'})
    }

    next()
}

module.exports = authUser;