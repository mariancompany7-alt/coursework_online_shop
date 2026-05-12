const express = require('express');
const router = express.Router();
const boxController = require('../controllers/boxController');

// GET-запит для отримання списку
router.get('/', boxController.getAllBoxes);

// POST-запит для створення нового боксу
router.post('/', boxController.createBox);

module.exports = router;