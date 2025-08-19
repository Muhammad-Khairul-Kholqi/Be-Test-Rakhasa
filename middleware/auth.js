const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const db = require('../db');

dotenv.config();

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({
        message: 'Access denied. No token provided.'
    });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({
            message: 'Invalid token.'
        });
        req.user = decoded;
        next();
    });
};

const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) return res.status(401).json({
            message: 'User not authenticated.'
        });
        if (!allowedRoles.includes(req.user.roleId)) return res.status(403).json({
            message: 'You do not have permission.'
        });
        next();
    };
};

const checkPermission = (permissionName) => {
    return async (req, res, next) => {
        if (!req.user) return res.status(401).json({
            message: 'User not authenticated.'
        });
        try {
            const [rows] = await db.promise().query(
                `SELECT p.name FROM RolePermissions rp
                 JOIN Permissions p ON rp.permissionId = p.id
                 WHERE rp.roleId = ?`,
                [req.user.roleId]
            );
            const permissions = rows.map(r => r.name);
            if (!permissions.includes(permissionName)) return res.status(403).json({
                message: 'You do not have permission.'
            });
            next();
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'Server error'
            });
        }
    };
};

module.exports = {
    verifyToken,
    checkRole,
    checkPermission
};
