const express = require('express');
const router = express.Router();
const {
    verifyToken,
    checkRole
} = require('../middleware/auth');
const {
    getRoles,
    createRole,
    updateRole,
    deleteRole,
    assignPermissions
} = require('../controllers/roleController');

router.use(verifyToken, checkRole([1]));

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Manajemen role dan assign permission (hanya admin)
 */

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Ambil semua role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar role berhasil diambil
 */
router.get('/', getRoles);

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Buat role baru
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Role berhasil dibuat
 */
router.post('/', createRole);

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: Update role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID role yang akan diupdate
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Role berhasil diupdate
 */
router.put('/:id', updateRole);

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Hapus role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID role yang akan dihapus
 *     responses:
 *       200:
 *         description: Role berhasil dihapus
 */
router.delete('/:id', deleteRole);

/**
 * @swagger
 * /api/roles/{roleId}/permissions:
 *   post:
 *     summary: Assign permission ke role tertentu
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID role yang akan diberikan permission
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - permissions
 *             properties:
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Permission berhasil diassign ke role
 */
router.post('/:roleId/permissions', assignPermissions);

module.exports = router;
