const db = require('../db');

const getRoles = async (req, res) => {
    try {
        const [roles] = await db.promise().query(`SELECT * FROM Roles`);
        res.json(roles);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error'
        });
    }
};

const createRole = async (req, res) => {
    const {
        name
    } = req.body;
    try {
        await db.promise().query(`INSERT INTO Roles (name) VALUES (?)`, [name]);
        res.status(201).json({
            message: 'Role created successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error'
        });
    }
};

const updateRole = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        name
    } = req.body;
    try {
        await db.promise().query(`UPDATE Roles SET name=? WHERE id=?`, [name, id]);
        res.json({
            message: 'Role updated successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error'
        });
    }
};

const deleteRole = async (req, res) => {
    const {
        id
    } = req.params;
    try {
        await db.promise().query(`DELETE FROM Roles WHERE id=?`, [id]);
        res.json({
            message: 'Role deleted successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error'
        });
    }
};

const assignPermissions = async (req, res) => {
    const {
        roleId
    } = req.params;
    const {
        permissionIds
    } = req.body; 

    try {
        await db.promise().query(`DELETE FROM RolePermissions WHERE roleId=?`, [roleId]);

        for (const pid of permissionIds) {
            await db.promise().query(`INSERT INTO RolePermissions (roleId, permissionId) VALUES (?,?)`, [roleId, pid]);
        }

        res.json({
            message: 'Permissions assigned successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error'
        });
    }
};

module.exports = {
    getRoles,
    createRole,
    updateRole,
    deleteRole,
    assignPermissions
};
