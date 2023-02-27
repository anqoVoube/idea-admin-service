function authPermission(permission) {
    return (req, res, next) => {
        if (!(req.user.permissions.includes(permission))) {
            res.status(401)
            return res.json({message: 'Not allowed'})
        }

        next()
    }
}

module.exports = authPermission;