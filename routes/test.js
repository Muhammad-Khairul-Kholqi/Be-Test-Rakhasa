const express = require('express');
const router = express.Router();
const {
    verifyToken,
    checkRole
} = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Test
 *   description: Route test untuk role/user/public
 */

/**
 * @swagger
 * /api/test/admin-test:
 *   get:
 *     summary: Route khusus admin
 *     tags: [Test]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Hello Admin
 *       403:
 *         description: Forbidden, akses ditolak
 */
router.get('/admin-test', verifyToken, checkRole([1]), (req, res) => {
    res.json({
        message: 'Hello Admin, you have access!'
    });
});

/**
 * @swagger
 * /api/test/user-test:
 *   get:
 *     summary: Route khusus user
 *     tags: [Test]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Hello User
 *       403:
 *         description: Forbidden, akses ditolak
 */
router.get('/user-test', verifyToken, checkRole([2]), (req, res) => {
    res.json({
        message: 'Hello User, you have access!'
    });
});

/**
 * @swagger
 * /api/test/public-test:
 *   get:
 *     summary: Route public, bisa diakses semua
 *     tags: [Test]
 *     responses:
 *       200:
 *         description: Hello Public
 */
router.get('/public-test', (req, res) => {
    res.json({
        message: 'Hello, this is public route!'
    });
});

module.exports = router;
