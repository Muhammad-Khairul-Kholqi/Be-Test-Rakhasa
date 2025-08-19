const db = require('../db'); 
const bcrypt = require('bcrypt');

const getUsers = async (req, res) => {
    try {
        const [rows] = await db.promise().query(
            `SELECT u.id, u.username, u.email, r.name AS role
             FROM Users u
             LEFT JOIN Roles r ON u.roleId = r.id`
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error'
        });
    }
};

const createUser = async (req, res) => {
    const {
        username,
        email,
        password,
        roleId
    } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.promise().query(
            `INSERT INTO Users (username, email, password, roleId) VALUES (?, ?, ?, ?)`,
            [username, email, hashedPassword, roleId]
        );
        res.status(201).json({
            message: 'User created successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error'
        });
    }
};

const updateUser = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        username,
        email,
        password,
        roleId
    } = req.body;
    try {
        let query = `UPDATE Users SET username=?, email=?, roleId=?`;
        const params = [username, email, roleId];

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            query += `, password=?`;
            params.push(hashedPassword);
        }

        query += ` WHERE id=?`;
        params.push(id);

        await db.promise().query(query, params);
        res.json({
            message: 'User updated successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error'
        });
    }
};

const deleteUser = async (req, res) => {
    const {
        id
    } = req.params;
    try {
        await db.promise().query(`DELETE FROM Users WHERE id=?`, [id]);
        res.json({
            message: 'User deleted successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error'
        });
    }
};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};
