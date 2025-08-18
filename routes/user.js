const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const checkRole = require('../middlewares/role');
const {
    PERMISSIONS
} = require('../config/roles');
const userController = require('../controllers/userController');

// Admin-only routes
router.post('/', auth, checkRole(PERMISSIONS.CREATE_USER), userController.createUser);
router.get('/', auth, checkRole(PERMISSIONS.VIEW_USERS), userController.getUsers);

module.exports = router;