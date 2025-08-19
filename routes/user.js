const express = require('express');
const router = express.Router();
const {
    verifyToken,
    checkRole,
    checkPermission
} = require('../middleware/auth');
const {
    getUsers,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Manajemen user (role/admin protected)
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Ambil semua user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar semua user
 *       403:
 *         description: Forbidden, akses ditolak
 */
router.get('/', verifyToken, checkRole([1]), checkPermission('view_user'), getUsers);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Buat user baru
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - roleId
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               roleId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: User berhasil dibuat
 *       403:
 *         description: Forbidden, akses ditolak
 */
router.post('/', verifyToken, checkRole([1]), checkPermission('create_user'), createUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               roleId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User berhasil diupdate
 *       403:
 *         description: Forbidden, akses ditolak
 */
router.put('/:id', verifyToken, checkRole([1]), checkPermission('edit_user'), updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Hapus user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User berhasil dihapus
 *       403:
 *         description: Forbidden, akses ditolak
 */
router.delete('/:id', verifyToken, checkRole([1]), checkPermission('delete_user'), deleteUser);

module.exports = router;
