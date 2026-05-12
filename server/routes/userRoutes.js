const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Визначаємо endpoints та прив'язуємо їх до функцій контролера
router.post('/register', userController.createUser);
router.get('/', userController.getAllUsers);

module.exports = router;