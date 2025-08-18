const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const {
    ROLES
} = require('../config/roles');

const login = async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body;
        const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

        if (users.length === 0) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign({
                id: user.id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET, {
                expiresIn: '1h'
            }
        );

        res.json({
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
};

module.exports = {
    login
};