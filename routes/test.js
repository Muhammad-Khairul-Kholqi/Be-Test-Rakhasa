const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const checkRole = require('../middlewares/role');
const {
    PERMISSIONS
} = require('../config/roles');
const testController = require('../controllers/testController');

// Public route
router.get('/public', testController.publicRoute);

// Protected route for any authenticated user
router.get('/user', auth, testController.userRoute);

// Admin-only route
router.get('/admin', auth, checkRole(PERMISSIONS.TEST_PERMISSION), testController.adminRoute);

// Permission test route
router.get('/permission', auth, checkRole(PERMISSIONS.TEST_PERMISSION), testController.permissionTest);

module.exports = router;