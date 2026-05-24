const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.get('/', protect, isAdmin, orderController.getAllOrders);
router.put('/:id/status', protect, isAdmin, orderController.updateOrderStatus);
router.delete('/:id', protect, isAdmin, orderController.deleteOrder);

module.exports = router;