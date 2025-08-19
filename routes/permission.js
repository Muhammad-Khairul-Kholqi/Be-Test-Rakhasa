const express = require('express');
const router = express.Router();
const {
    verifyToken,
    checkRole
} = require('../middleware/auth');
const {
    getPermissions,
    createPermission,
    updatePermission,
    deletePermission
} = require('../controllers/permissionController');

router.use(verifyToken, checkRole([1]));

/**
 * @swagger
 * tags:
 *   name: Permissions
 *   description: Manajemen permission (hanya admin)
 */

/**
 * @swagger
 * /api/permissions:
 *   get:
 *     summary: Ambil semua permission
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar permission berhasil diambil
 */
router.get('/', getPermissions);

/**
 * @swagger
 * /api/permissions:
 *   post:
 *     summary: Buat permission baru
 *     tags: [Permissions]
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
 *         description: Permission berhasil dibuat
 */
router.post('/', createPermission);

/**
 * @swagger
 * /api/permissions/{id}:
 *   put:
 *     summary: Update permission
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID permission yang akan diupdate
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
 *         description: Permission berhasil diupdate
 */
router.put('/:id', updatePermission);

/**
 * @swagger
 * /api/permissions/{id}:
 *   delete:
 *     summary: Hapus permission
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID permission yang akan dihapus
 *     responses:
 *       200:
 *         description: Permission berhasil dihapus
 */
router.delete('/:id', deletePermission);

module.exports = router;
