const bcrypt = require('bcryptjs');
const db = require('../config/db');
const {
    ROLES
} = require('../config/roles');

const createUser = async (req, res) => {
    try {
        const {
            username,
            password,
            role
        } = req.body;

        if (!Object.values(ROLES).includes(role)) {
            return res.status(400).json({
                message: 'Invalid role'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
            [username, hashedPassword, role]
        );

        res.status(201).json({
            id: result.insertId,
            username,
            role
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
};

const getUsers = async (req, res) => {
    try {
        const [users] = await db.query('SELECT id, username, role FROM users');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
};

module.exports = {
    createUser,
    getUsers
};