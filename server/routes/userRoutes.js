const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/', protect, isAdmin, userController.getAllUsers);

module.exports = router;