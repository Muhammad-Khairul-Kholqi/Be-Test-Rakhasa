const db = require('../db');

const getPermissions = async (req, res) => {
    try {
        const [permissions] = await db.promise().query(`SELECT * FROM Permissions`);
        res.json(permissions);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error'
        });
    }
};

const createPermission = async (req, res) => {
    const {
        name
    } = req.body;
    try {
        await db.promise().query(`INSERT INTO Permissions (name) VALUES (?)`, [name]);
        res.status(201).json({
            message: 'Permission created successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error'
        });
    }
};

const updatePermission = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        name
    } = req.body;
    try {
        await db.promise().query(`UPDATE Permissions SET name=? WHERE id=?`, [name, id]);
        res.json({
            message: 'Permission updated successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error'
        });
    }
};

const deletePermission = async (req, res) => {
    const {
        id
    } = req.params;
    try {
        await db.promise().query(`DELETE FROM Permissions WHERE id=?`, [id]);
        res.json({
            message: 'Permission deleted successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error'
        });
    }
};

module.exports = {
    getPermissions,
    createPermission,
    updatePermission,
    deletePermission
};
