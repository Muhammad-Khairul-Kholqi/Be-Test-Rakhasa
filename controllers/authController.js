const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const register = async (req, res) => {
    const {
        username,
        email,
        password,
        roleId
    } = req.body;

    if (!username || !email || !password || !roleId) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO Users (username, email, password, roleId) VALUES (?, ?, ?, ?)';
    db.query(sql, [username, email, hashedPassword, roleId], (err, result) => {
        if (err) return res.status(500).json({
            message: err.message
        });
        res.status(201).json({
            message: 'User registered successfully'
        });
    });
};

const login = (req, res) => {
    const {
        email,
        password
    } = req.body;

    if (!email || !password) return res.status(400).json({
        message: 'Email and password required'
    });

    const sql = 'SELECT * FROM Users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).json({
            message: err.message
        });
        if (results.length === 0) return res.status(404).json({
            message: 'User not found'
        });

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({
            message: 'Invalid password'
        });

        const token = jwt.sign({
            id: user.id,
            roleId: user.roleId
        }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        res.json({
            token
        });
    });
};

module.exports = {
    register,
    login
};
