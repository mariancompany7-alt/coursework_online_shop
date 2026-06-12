const express = require('express');
const router = express.Router();
const boxController = require('../controllers/boxController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.get('/', boxController.getAllBoxes);

router.post('/', protect, isAdmin, boxController.createBox);
router.put('/:id', protect, isAdmin, boxController.updateBox);
router.delete('/:id', protect, isAdmin, boxController.deleteBox);

module.exports = router;