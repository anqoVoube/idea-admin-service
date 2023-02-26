function authPermission(permission) {
    return (req, res, next) => {
        if (!(req.user.permissions.map(x => x.name).includes(permission))) {
            res.status(401)
            return res.json({message: 'Not allowed'})
        }

        next()
    }
}

module.exports = authPermission;