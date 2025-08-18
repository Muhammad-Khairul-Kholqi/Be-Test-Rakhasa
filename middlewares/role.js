const {
    PERMISSIONS,
    ROLE_PERMISSIONS
} = require('../config/roles');

module.exports = (permission) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(403).json({
                message: 'Forbidden'
            });
        }

        const userPermissions = ROLE_PERMISSIONS[req.user.role] || [];

        if (!userPermissions.includes(permission)) {
            return res.status(403).json({
                message: 'Insufficient permissions'
            });
        }

        next();
    };
};